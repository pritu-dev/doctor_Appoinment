import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name:{ type: String, required:true},
    email:{ type: String, required:true, unique:true},
    password:{ type: String, required:true},
    image:{ type: String},
    speciality:{ type: String, required:true},
    education:{ type: String},
    experience:{ type: String, required:true},
    about:{ type: String, required:true},
    available:{ type: Boolean, default: true},
    fees:{ type: Number, required:true},
    address: {
  line1: { type: String, required: true },
  line2: { type: String, required: true }
},
    date:{ type: Number},
    slots_booked:{ type: Object, default:{}},
}, {minimize:false});


const DoctorModel = mongoose.model("DoctorModel", doctorSchema);

export default DoctorModel;