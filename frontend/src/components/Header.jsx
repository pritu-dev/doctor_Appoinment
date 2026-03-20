import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Header = () => {
   const navigate = useNavigate();

  return (
  <div>
    <div className="container">
    <div className="row text-opacity-75  rounded-3" style={{ backgroundColor: "#5F6FFF", height:"30rem" }}>
        
        <div className="col-6 p-5 mt-5">
          <h1 className='text-light fw-bold'>
            Book Appointment <br />
            With Trusted <br />
            Doctors
          </h1>

          <div className='d-flex'>
          <div className='p-2'>
              <img src={assets.group_profiles} alt="" />
          </div>

          <p className='text-light ms-3'>
            Simply browse through our extensive list of <br />
            trusted doctors, <br />
            schedule your appointment hassle-free.
          </p>
          </div>

   <button onClick={() => navigate("/speciality")} className="btn rounded-pill bg-light text-dark px-5 py-2" >
    Book appointment  <img className="ms-1" style={{color: "#595959"}} src={assets.arrow_icon} alt="" />
    </button>
        </div>

        <div className="col-6">
          <img
            className='mt-5'
            style={{ height: "390px" }}
            src={assets.header_img}
            alt="header_img"
          />
        </div>

      </div>
    </div>
  </div>
);

}

export default Header;
