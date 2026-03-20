import React, { useContext, useState } from 'react';
import { AdminContext } from "../context/AdminContext.jsx";
import { DoctorContext } from "../context/DoctorContext.jsx";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [state, setState] = useState("doctor");
    const [email, setEmail] = useState("adminprescripto@gmail.com");
    const [password, setPassword] = useState("YU7JDJK9W");

    const { setAToken, backendUrl } = useContext(AdminContext);
    const { setDToken } = useContext(DoctorContext);

    const OnSubmit = async (event) => {
        event.preventDefault();

        try {

            if (state === "Admin") {
                const { data } = await axios.post(backendUrl + "/api/admin/login", { email, password });
                if (data.success) {
                    localStorage.setItem("aToken", data.token)
                    setAToken(data.token);
                    navigate("/doctor-list")
                }
                else {
                    toast.error(data.message)
                }
            }
            else {
                const { data } = await axios.post(backendUrl + "/api/doctor/login", { email, password });
                if (data.success) {
                    localStorage.setItem("dToken", data.token);
                    setDToken(data.token);
                    toast.success("Doctor Login Successfully");
                    navigate("/doctor-dashboard");
                }
                else {
                    toast.error(data.message)
                }
            }
        }
        catch (error) {
            toast.error(error.message)
        }

    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <form onSubmit={OnSubmit} className="card shadow p-4" style={{ width: "400px" }}>

                <h3 className="text-center mb-4">
                    <span className="text-primary">{state}</span> Login
                </h3>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input name="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder="Enter email" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input name="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Enter password" required />
                </div>

                <button className="btn btn-primary w-100">
                    login
                </button>

                {
                    state === "Admin" ?
                        <p className='mt-2'>Doctor login? <span onClick={() => setState("Doctor")} className='text-color-primary'><a href="#">Click here</a></span></p>
                        : <p className='mt-2'>Admin login? <span onClick={() => setState("Admin")} ><a href="#">Click here</a></span></p>
                }

            </form>
        </div>
    );
}

export default Login;