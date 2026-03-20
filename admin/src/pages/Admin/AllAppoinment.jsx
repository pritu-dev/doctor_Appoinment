import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";
import { AppContext } from "../../context/AppContext.jsx";
import { assets } from "../../assets/assets.js";

const AllAppoinment = () => {
    const { getAllAppointments, appoinments, aToken, cancleAppointment } = useContext(AdminContext);
    const { calculateAge, currency } = useContext(AppContext);

    useEffect(() => {
        if (aToken) {
            getAllAppointments();
        }
    }, [aToken]);

    return (
  <div className="container mt-4">

    <h4 className="mb-4 fw-semibold">All Appointments</h4>

    {/* Header */}
    <div
      className="d-grid border rounded p-3 fw-semibold bg-light text-secondary fw-bold"
      style={{
        gridTemplateColumns: "0.5fr 2fr 1fr 2fr 2fr 1fr 1fr",
        fontSize: "14px",
      }}
    >
      <div>#</div>
      <div>Patient</div>
      <div>Age</div>
      <div>Date & Time</div>
      <div>Doctor</div>
      <div>Fees</div>
      <div className="text-center">Status</div>
    </div>

    {/* Rows */}
    {appoinments
      .slice()
      .reverse()
      .map((item, idx) => (
        <div
          key={item._id}
          className="d-grid border-bottom p-3 align-items-center"
          style={{
            gridTemplateColumns: "0.5fr 2fr 1fr 2fr 2fr 1fr 1fr",
            fontSize: "14px",
          }}
        >
          {/* Index */}
          <div className="text-muted">{idx + 1}</div>
          <div className="d-flex align-items-center gap-2">
            <img
              src={assets.patients_icon}
              alt=""
              width="35"
              height="35"
              style={{ borderRadius: "50%" }}
            />
            <span>{item.userData.name}</span>
          </div>


          {/* Age */}
          <div>{calculateAge(item.userData?.dob)}</div>

          {/* Date */}
          <div>
            <span className="text-dark fw-medium">
              {item.slotDate}
            </span>
            <br />
            <small className="text-muted">
              {item.slotTime}
            </small>
          </div>

          {/* Doctor */}
          <div className="d-flex align-items-center gap-2">
            <img
              src={item.docData?.image}
              alt=""
              width="35"
              height="35"
              style={{ borderRadius: "50%" }}
            />
            <span>{item.docData?.name}</span>
          </div>

          {/* Fees */}
          <div className="fw-semibold">
            {currency}{item.amount}
          </div>

          {/* Status / Action */}
          <div className="text-center">

            {item.cancelled ? (
              <span className="badge bg-danger px-3 py-2">
                Cancelled
              </span>

            ) : item.isCompleted ? (
              <span className="badge bg-success px-3 py-2">
                Completed
              </span>

            ) : (
              // <img
              //   onClick={() => cancleAppointment(item._id)}
              //   src={assets.cancel_icon}
              //   alt=""
              //   style={{ width: "50px", cursor: "pointer" }}
              // />
              <p className="fw-bold  ">pending</p>
            )}

          </div>

        </div>
      ))}
  </div>
);
};

export default AllAppoinment;

