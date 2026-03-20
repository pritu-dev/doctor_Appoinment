import React from 'react';
import { assets } from "../assets/assets.js";
import "./About.css";

const About = () => {
    return (
        <div className='container'>
            <div className="row p-5">
                <div className="col-6">
                    <img className="w-75" src={assets.about_image} alt="" />
                </div>

                <div className="col-6">
                    <h3 style={{ color: "#707070" }}>
                        About <span className='text-dark'>US</span>
                    </h3>
                    <p className="mt-3" style={{ color: "#4B5563" }}>
                        Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
                    </p>

                    <p style={{ color: "#4B5563" }}>
                        Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
                    </p>

                    <h5 >Our Vision</h5>
                    <p  style={{ color: "#4B5563" }}>
                        Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
                </div>
            </div>

            <div>
                <h5 className='p-3'>WHY <span className='text-gray fw-bold'>CHOOSE US</span></h5>
                <div className='d-flex mb-5'>
                    <div className='p-5 border hover-box'>
                        <h5 >EFFICIENCY:</h5>
                        Streamlined appointment scheduling that fits into your busy lifestyle.
                    </div>

                    <div className='p-5 hover-box border'>
                        <h5 >CONVENIENCE:</h5>
                        Access to a network of trusted healthcare professionals in your area.
                    </div>

                    <div className='p-5 hover-box border'>
                        <h5>PERSONALIZATION:</h5>
                        Tailored recommendations and reminders to help you stay on top of your health.
                    </div>
                </div>
            </div>

        </div>
    )
}

export default About;
