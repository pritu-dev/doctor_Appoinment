import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import 'dotenv/config';
import {connectCloudinary} from "./cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoute.js";
const app = express();
const PORT = 8080;
console.log(process.env.CLOUDINARY_NAME);
app.use(express.json());

app.use(cors({
  origin: [
    "https://admindoctor-1.onrender.com",
    "https://frontenddoctor-1.onrender.com"
  ],
  credentials: true
}));

app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter)

app.get("/", (req,res) => {
    res.json({msg:"hello"})
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

app.listen(PORT, () => {
    console.log("app is listing on port 8080");
});


