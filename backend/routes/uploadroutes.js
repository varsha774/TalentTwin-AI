const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const pdfData = await pdfParse(req.file.buffer);

    res.json({
      success: true,
      message: "Resume uploaded successfully!",
      filename: req.file.originalname,
      pages: pdfData.numpages,
      text: pdfData.text,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;