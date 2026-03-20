import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Banner = () => {
    const navigate = useNavigate();
    return (
        <div className='container w-75 h-50 mt-3' >
            <div className="row rounded-3 p-5" style={{ backgroundColor: "#5F6FFF" }}>

                <div className="col-6 mt-5">
                    <h1 className='text-light fw-bold'>Book Appointment <br />With 100+ <br />Trusted Doctors</h1>
                    <button onClick={() => navigate("/login")} className="btn rounded-pill bg-light text-dark mt-3 px-4 py-2">
                       Create Account
                    </button>
                </div>

                <div className="col-6">
                    <img className="mb-5" src={assets.appointment_img} style={{ height: "400px" }} alt="" />
                </div>
            </div>
        </div>
    );
}

export default Banner;
