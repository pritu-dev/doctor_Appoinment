import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability} = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

return (
  <div className="container ">
    <h2 className="mb-4">All Doctors</h2>

    <div className="row g-4">

      {doctors.map((item, idx) => (
        <div key={idx} className="col-md-4 col-lg-3">

          <div className="card shadow-sm h-100 text-center p-2">

            {/* Doctor Image */}
            <div className="d-flex justify-content-center">
              <img
                src={item.image}
                alt="doctor"
                style={{
                  width: "110px",
                  height: "110px",
                  objectFit: "cover"
                }}
              />
            </div>

            {/* Doctor Info */}
            <div className="card-body">

              <h5 className="card-title mb-1">
                {item.name}
              </h5>

              <p className="text-muted mb-1 p-2">
                {item.speciality}
              </p>

              {/* Availability */}
              <div className="form-check d-flex justify-content-center align-items-center gap-2">

                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={item.available}
                  onChange={() => changeAvailability(item._id)}
                />

                <label className="form-check-label">
                  Available
                </label>

              </div>

            </div>

          </div>

        </div>
      ))}

    </div>
  </div>
);
};

export default DoctorsList;