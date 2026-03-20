import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{ type: String, required:true},
    email:{ type: String, required:true, unique:true},
    password:{ type: String, required:true},
    image:{ type: String},
    address:{ type: Object},
    gender: {type:String, default: "Not Selected"},
    dob: {type:String, default: "Not Selected"},
    phone:  {type:String, default: "0000 0000 00"},
});

const UserModel = mongoose.model("UserModel", UserSchema);

export default UserModel;