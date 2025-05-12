// config/db.js
const mongoose = require("mongoose");
const { Pool } = require("pg");

// PostgreSQL pool (still there if needed)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// MongoDB connection
function connectToDB() {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
}

// ✅ Define Mongoose schema + model for uploaded files
const FileSchema = new mongoose.Schema({
  filename: String,
  filepath: String,
  mimetype: String,
  size: Number,
  uploadedAt: { type: Date, default: Date.now }
});

const FileModel = mongoose.model("UploadedFile", FileSchema);

// ✅ Export everything together
module.exports = {
  sql: pool,
  connectToDB,
  FileModel // <-- use this in your route
};
