import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config';
import {connectCloudinary} from "./cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
import aiRouter from "./routes/aiRoute.js";
const app = express();
const PORT = 8080;

app.use(express.json());

app.use(cors({
  origin: [
    "https://admindoctor-1.onrender.com",
    "https://frontenddoctor-1.onrender.com"
  ],
  credentials: true
}));

// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "http://localhost:8080"
//   ],
//   credentials: true
// }));

app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);
app.use("/api/ai", aiRouter);

app.get("/", (req,res) => {
    res.json({msg:"hello god"})
})

connectCloudinary();

await main()
 .then(() => {
        console.log("MongoDb connected successfully");
     })
     .catch((err) => {
        console.log(err);
     })

async function main() {
    await mongoose.connect(process.env.MONGO_URL)
}

import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// async function main() {
//   console.log("Calling Gemini...");

//   try {
//     const interaction = await ai.interactions.create({
//       model: "gemini-3.8-flash",
//       input: "Hello, explain AI in one sentence.",
//     });

//     console.log("AI Response:");
//     console.log(interaction.output_text);
//   } catch (error) {
//     console.error("Gemini Error:", error);
//   }
// }

// main();
app.listen(PORT, () => {
    console.log("app is listing on port 8080");
});
