// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["https://upscaleflowai.com"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Email transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Verify email setup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email config error:", error);
  } else {
    console.log("✅ Email server ready to send");
  }
});

// Routes
app.use("/api", require("./routes/orders"));
app.use("/api", require("./routes/chatbot"));  
app.use("/api", require("./routes/contact"));
app.use("/api", require("./routes/Logopackage"));
app.use("/api", require("./routes/Socialpackage"));
app.use("/api", require("./routes/Hardcopypackage"));
app.use("/api", require("./routes/aiautomation"));

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "Upscale Packages API is running!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
