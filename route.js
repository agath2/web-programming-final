const { GoogleGenAI } = require("@google/genai");
const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config({ path: ".env.local" }); // Load environment variables

const app = express();
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY }); // Use API key from environment variable

app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: userMessage,
    });
    res.json({ reply: response.data.text }); // Adjusted to match response structure
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});