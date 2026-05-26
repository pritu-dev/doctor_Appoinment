import React from 'react';
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContextProvider';
import { useEffect } from 'react';
import { assets } from "../assets/assets.js";

const AllDoctors = () => {
    const navigate = useNavigate();
    const { doctors, getDoctorData } = useContext(AppContext);

    useEffect(() => {
        getDoctorData();
    }, []);

    return (
        <div className='container'>
            <div className="row">
                <div className='text-center mt-4'>
                    <h2>Top Doctors to Book</h2>
                    <p className='mt-3 '>Simply browse through our extensive <br />list of trusted doctors.</p>
                </div>
            </div>

            <div className="container mt-4">
                <div className="row">

                    {doctors.map((item) => (
                        <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                            <div onClick={() => navigate(`/doctors/${item.speciality}`)} className="card h-100 shadow-sm border-0">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{ height: "220px", objectFit: "cover" }}
                                />

                                <div className="card-body text-center">

 <div className="d-flex justify-content-center align-items-center mb-1">
  <span
    className={`d-inline-block rounded-circle me-2 ${
      item.available ? "bg-success" : "bg-danger"
    }`}
    style={{ width: "8px", height: "8px" }}
  ></span>

  <p
    className="fw-medium mb-0"
    style={{ color: item.available ? "#22C55E" : "#EF4444" }}
  >
    {item.available ? "Available" : "Not Available"}
  </p>
</div>


                                    <h6 className="fw-bold">{item.name}</h6>
                                    <p className="text-muted mb-0">{item.speciality}</p>
                                </div>
                            </div>

                        </div>

                    ))}

                </div>
            </div>
            <div className='d-flex justify-content-center mt-2'>
                <button className="rounded-pill px-5 py-3 border-0"
                    style={{ backgroundColor: "#EAEFFF", color: "#4B5563" }}
                    onClick={() => navigate("/doctors")}>More</button>
            </div>
        </div>
    );
}

export default AllDoctors;
