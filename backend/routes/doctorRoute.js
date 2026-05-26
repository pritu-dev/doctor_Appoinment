import express from "express";
import { doctorList, loginDoctor, appointmentsData, appointmentComplete, appointmentCancle, doctorDashBoard, doctorProfile, updateDoctorProfile} from "../controllers/doctorController.js";
import authDoctor from "../middleware/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list",doctorList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", authDoctor, appointmentsData);
doctorRouter.post("/complete-appointment", authDoctor,  appointmentComplete,);
doctorRouter.post("/cancle-appointment", authDoctor, appointmentCancle);
doctorRouter.get("/dashboard",authDoctor, doctorDashBoard);
doctorRouter.get("/profile", authDoctor, doctorProfile);
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile)

export default doctorRouter;