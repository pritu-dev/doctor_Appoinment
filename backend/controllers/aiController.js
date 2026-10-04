
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    console.log("User:", message);

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: message,
    });

    console.log("AI:", response.text);

    res.status(200).json({
      success: true,
      reply: response.text,
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      success: false,
      message: "AI response failed",
    });
  }
};