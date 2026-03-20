import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";
import { useNavigate } from 'react-router-dom';

const Doctor = () => {
  const { doctors } = useContext(AppContext);
  const { speciality } = useParams();
  const navigate = useNavigate();

  const [selectedSpeciality, setSelectedSpeciality] = useState("");

  // Sync URL with state
  useEffect(() => {
    setSelectedSpeciality(speciality);
    window.scrollTo(0, 0);
  }, [speciality]);

  // Filtered Doctors (Derived State)
  const filteredDoctors = selectedSpeciality
    ? doctors.filter((doc) => doc.speciality === selectedSpeciality)
    : doctors;

  const specialities = [
    "General",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  return (
    <div className="container mt-4">
      <div className="row">

        {/* Left Side Category List */}
        <div className="col-md-3 mb-4">
          <h5 className="m-4">Browse through the doctors specialist</h5>

          {specialities.map((item, index) => (
            <p key={index}
              className={`p-2 border rounded cursor-pointer ${selectedSpeciality === item ? "bg-primary text-white" : ""
                }`}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/doctors/${item}`)}
            >
              {item}
            </p>
          ))}
        </div>

        {/* Right Side Doctors */}
        <div className="col-md-9">
          <div className="row m-4">

            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doc) => (
                <div className="col-md-4 mb-4" key={doc._id}>

                  <div className="card shadow-sm h-100" onClick={() => navigate(`/appoinment/${doc._id}`)}>
                    <img src={doc.image} className="card-img-top" style={{ height: "200px", objectFit: "cover" }} />

                    <div className="card-body">
                      {/* <p className="fw-bold" style={{color:"#22C55E"}} >● Available</p> */}
                      <div className="d-flex align-items-center mb-2">
                        <span
                          className={`d-inline-block rounded-circle me-2 ${doc.available ? "bg-success" : "bg-danger"
                            }`}
                          style={{ width: "8px", height: "8px" }}
                        ></span>

                        <p
                          className="fw-medium mb-0"
                          style={{ color: doc.available ? "#22C55E" : "#EF4444" }}
                        >
                          {doc.available ? "Available" : "Not Available"}
                        </p>
                      </div>

                      <h6>{doc.name}</h6>
                      <p >{doc.speciality}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No doctors found.</p>

            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Doctor;