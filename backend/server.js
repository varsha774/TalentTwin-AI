require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { PDFParse } = require("pdf-parse");

// AI Service (optional)
const analyzeResumeWithAI = require("./services/aiService");

const app = express();

app.use(cors());
app.use(express.json());


// =======================
// MongoDB Connection
// =======================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error");
    console.error(err.message);
  });


// =======================
// Test Route
// =======================

app.get("/", (req, res) => {
  res.send("TalentTwin AI Backend Running 🚀");
});


// =======================
// Create Upload Folder
// =======================

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}


// =======================
// Multer Configuration
// =======================

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }

});


const upload = multer({
  storage
});



// =======================
// Resume Upload Route
// =======================

app.post("/api/upload", upload.single("resume"), async (req, res) => {

  try {

    console.log("🚀 Upload route called");


    if (!req.file) {

      return res.status(400).json({
        success:false,
        message:"No file uploaded"
      });

    }


    console.log("📄 File:", req.file.originalname);



    const buffer = fs.readFileSync(req.file.path);



    const parser = new PDFParse({
      data: buffer
    });



    const pdfData = await parser.getText();



    await parser.destroy();



    console.log("✅ PDF Parsed");


    res.json({

      success:true,

      filename:req.file.filename,

      extractedText:pdfData.text

    });



  } catch(error){

    console.error("❌ Upload Error");
    console.error(error);


    res.status(500).json({

      success:false,

      message:error.message

    });

  }

});





// =======================
// Resume Analysis Route
// =======================


app.post("/api/analyze", async (req,res)=>{


try{


const {text}=req.body;



if(!text){

return res.status(400).json({

success:false,

message:"No resume text provided"

});

}



// Skills Database

const skillsList=[

"Python",
"Java",
"JavaScript",
"React",
"Node.js",
"MongoDB",
"SQL",
"Machine Learning",
"Deep Learning",
"AI",
"Data Science",
"AWS",
"Docker",
"Git"

];



// Detect Skills

const detectedSkills = skillsList.filter(skill=>

text.toLowerCase().includes(skill.toLowerCase())

);




// Resume Score

const score = Math.min(

100,

40 + detectedSkills.length * 7

);




// Job Matching

const jobRoles=[];



if(

detectedSkills.includes("Python") &&

detectedSkills.includes("Machine Learning")

){

jobRoles.push({

role:"AI Engineer",

match:92

});

}



if(

detectedSkills.includes("SQL") ||

detectedSkills.includes("Data Science")

){

jobRoles.push({

role:"Data Analyst",

match:88

});

}



if(

detectedSkills.includes("JavaScript") &&

detectedSkills.includes("React")

){

jobRoles.push({

role:"Frontend Developer",

match:85

});

}



if(

detectedSkills.includes("JavaScript") &&

detectedSkills.includes("Node.js") &&

detectedSkills.includes("MongoDB")

){

jobRoles.push({

role:"Full Stack Developer",

match:90

});

}




if(

detectedSkills.includes("Java") &&

jobRoles.length===0

){

jobRoles.push({

role:"Software Developer",

match:80

});

}




if(jobRoles.length===0){

jobRoles.push({

role:"Software Developer",

match:70

});

}





// Suggestions

const suggestions=[

"Add more measurable project achievements",

"Include relevant certifications",

"Optimize resume keywords for ATS"

];




// Response

res.json({

success:true,

analysis:{


resumeScore:score,


skills:detectedSkills,


jobRoles,


suggestions


}


});




}catch(error){


console.error("❌ Analysis Error");

console.error(error);



res.status(500).json({

success:false,

message:error.message

});


}



});





// =======================
// Start Server
// =======================


const PORT = process.env.PORT || 5000;


const server = app.listen(PORT,()=>{


console.log(`✅ Server running on http://localhost:${PORT}`);


});



server.on("error",(err)=>{


console.error("❌ Server Error");

console.error(err);


});