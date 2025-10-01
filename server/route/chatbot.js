// routes/chatbot.js
const express = require("express");
const fetch = require("node-fetch"); // npm install node-fetch
const router = express.Router();

router.post("/chatbot", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        reply: "Please provide a valid message.",
      });
    }

    console.log("📤 Sending to n8n:", message);

    const response = await fetch("https://n8n.srv891887.hstgr.cloud/webhook/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "ChatBot-Backend/1.0",
      },
      body: JSON.stringify({ message: message.trim() }),
    });

    console.log("📥 n8n response status:", response.status);

    if (!response.ok) {
      console.error("❌ n8n returned error:", response.status, response.statusText);
      return res.status(502).json({
        reply: "🤖 The chatbot service is temporarily unavailable. Please try again later.",
      });
    }

    // ✅ Always parse JSON directly
    const data = await response.json();
    console.log("✅ n8n response data:", data);

    // Send the entire n8n JSON back to frontend
    res.json(data);

  } catch (error) {
    console.error("❌ Chatbot proxy error:", error.message);

    if (error.name === "AbortError") {
      return res.status(504).json({
        reply: "⏰ Request timed out. The chatbot service is taking too long to respond.",
      });
    }

    if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
      return res.status(503).json({
        reply: "🌐 Cannot reach the chatbot service. Please check if the n8n server is running.",
      });
    }

    res.status(500).json({
      reply: "⚠️ An unexpected error occurred. Please try again later.",
    });
  }
});

module.exports = router;
