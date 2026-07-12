import { useState } from "react";
import axios from "axios";

function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a resume PDF");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);

      // Upload Resume
      const uploadResponse = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(uploadResponse.data);


      // Analyze Resume
      const analyzeResponse = await axios.post(
        "http://localhost:5000/api/analyze",
        {
          text: uploadResponse.data.extractedText,
        }
      );


      setAnalysis(analyzeResponse.data.analysis);


    } catch (error) {
      console.error("Error:", error);
      alert("Upload failed ❌");

    } finally {
      setLoading(false);
    }
  };


  return (
    <div style={{ padding: "20px" }}>

      <h2>Upload Your Resume</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload}>
        {loading ? "Analyzing..." : "Upload Resume"}
      </button>


      {result && (
        <div>

          <h2>✅ Resume Uploaded Successfully</h2>

          <p>
            File: {result.filename}
          </p>


          <h3>Extracted Resume Text</h3>

          <textarea
            value={result.extractedText}
            readOnly
            rows="10"
            cols="80"
          />

        </div>
      )}



      {analysis && (
        <div style={{ marginTop: "30px" }}>

          <h2>🤖 AI Resume Analysis</h2>


          <h3>
            📊 Resume Score: {analysis.resumeScore}/100
          </h3>


          <h3>💻 Skills Detected</h3>

          <ul>
            {analysis.skills.map((skill, index) => (
              <li key={index}>
                {skill}
              </li>
            ))}
          </ul>
          <h3>🎯 Best Matching Roles</h3>

<ul>
  {analysis.jobRoles &&
    analysis.jobRoles.map((job, index) => (
      <li key={index}>
        {job.role} - {job.match}%
      </li>
    ))}
</ul>



          <h3>💡 Suggestions</h3>

          <ul>
            {analysis.suggestions.map((item, index) => (
              <li key={index}>
                {item}
              </li>
            ))}
          </ul>


        </div>
      )}

    </div>
  );
}

export default ResumeUpload;