import express from "express";

import { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancle, adminDashBoard } from "../controllers/adminController.js";
import authAdmin from "../middleware/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

import multer from "multer";
import { storage } from "../cloudinary.js";
const upload = multer({ storage });

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", loginAdmin); 
adminRouter.post("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availability", authAdmin, changeAvailability);
adminRouter.get("/all-appoinments", authAdmin, appointmentsAdmin);
adminRouter.post("/cancle-appoinments", authAdmin, appointmentCancle)
adminRouter.get("/dashboard", authAdmin, adminDashBoard)

export default adminRouter;