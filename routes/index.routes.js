const express = require("express");
const multer = require("multer");
const path = require("path");
const { sql, FileModel } = require("../config/db"); // ✅ Added FileModel

const router = express.Router();

router.get("/home", (req, res) => {
  res.render("home");
});

// Multer storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// File upload route
router.post("/upload-file", upload.single("file"), async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");

  const { filename, path: filepath, mimetype, size } = req.file;

  try {
    // ✅ MongoDB insert
    await FileModel.create({
      filename,
      filepath,
      mimetype,
      size
    });

    res.send("File uploaded and saved to MongoDB!");
  } catch (err) {
    console.error("MongoDB insert error:", err);
    res.status(500).send("Error saving file info to MongoDB");
  }
});


module.exports = router;
