// import React, { useEffect, useContext } from 'react';
// import { DoctorContext } from '../../context/DoctorContext';
// import { AppContext } from '../../context/AppContext';
// import { assets} from "../../assets/assets.js";
// const DoctorAppointment = () => {

//   const { dToken, getAppointments, appointments,completeAppointment,cancleAppointment, } = useContext(DoctorContext);
//   const { calculateAge } = useContext(AppContext);

//   useEffect(() => {
//     if (dToken) {
//       getAppointments();
//     }
//   }, [dToken]);

//   return (
//     <div>
//       <p>All Appointments</p>

//       <div
//         className="d-grid border-bottom p-2 align-items-center  fw-bold"
//         style={{ gridTemplateColumns: "0.5fr 2fr 2fr 1fr 2fr 1fr 1fr", color:"#4B5563"}}
//       >
//         <p>#</p>
//         <p>Patient</p>
//         <p>Payment</p>
//         <p>Age</p>
//         <p>Date & Time</p>
//         <p>Fees</p>
//         <p>Action</p>
//       </div>

//       {appointments.reverse().map((item, idx) => (
//         <div
//           key={idx}
//           className="d-grid border-bottom p-2 align-items-center"
//           style={{ gridTemplateColumns: "0.5fr 2fr 2fr 1fr 2fr 1fr 1fr" }}
//         >
//           <p>{idx + 1}</p>

//           <div className="d-flex align-items-center gap-2">
//             <img
//               // src={item.userData.image}
//               src={assets.patients_icon}
//               alt="sss"
//               width="40"
//               style={{ borderRadius: "50%" }}
//             />
//             <p>{item.userData.name}</p>
//           </div>

//           <p>{item.payment ? "Online" : "Cash"}</p>y

//           <p>{calculateAge(item.userData.dob)}</p>

//           <p>{item.slotDate} | {item.slotTime}</p>

//           <p>{item.amount}</p>

//          <div>
//           {
//             item.cancelled ? <p className='text-danger'>Cancelled</p> : item.isCompleted ? <p className='text-success'>Completed</p> : <div>
//                <img onClick={() => cancleAppointment(item._id)} src={assets.cancel_icon}></img>
//                <img onClick={() => completeAppointment(item._id)} src={assets.tick_icon}></img>
//             </div>
//           }
//          </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DoctorAppointment;



import React, { useEffect, useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets.js";

const DoctorAppointment = () => {
  const {
    dToken,
    getAppointments,
    appointments,
    completeAppointment,
    cancleAppointment,
  } = useContext(DoctorContext);

  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="p-4">

      <h5 className="mb-4 fw-semibold">All Appointments</h5>

      {/* Header */}
      <div
        className="d-grid border rounded p-3 fw-semibold bg-light text-secondary fw-bold"
        style={{
          gridTemplateColumns: "0.5fr 2fr 1.5fr 1fr 2fr 1fr 1fr",
          fontSize: "14px",
        }}
      >
        <p>#</p>
        <p>Patient</p>
        <p>Payment</p>
        <p>Age</p>
        <p>Date & Time</p>
        <p>Fees</p>
        <p className="text-center">Action</p>
      </div>

      {/* Rows */}
      {appointments
        .slice()
        .reverse()
        .map((item, idx) => (
          <div
            key={item._id}
            className="d-grid border-bottom p-1 align-items-center"
            style={{
              gridTemplateColumns: "0.5fr 2fr 1.5fr 1fr 2fr 1fr 1fr",
              fontSize: "14px",
            }}
          >
            <p>{idx + 1}</p>

            {/* Patient */}
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

            {/* Payment */}
            <p>{item.payment ? "Online" : "Cash"}</p>

            {/* Age */}
            <p>{calculateAge(item.userData.dob)}</p>

            {/* Date */}
            <p>
              {item.slotDate} | {item.slotTime}
            </p>

            {/* Fees */}
            <p> ${item.amount}</p>

            {/* Action */}
            <div className="d-flex justify-content-center gap-2">
              {item.cancelled ? (
                <p className="text-danger m-0 fw-bold">Cancelled</p>
              ) : item.isCompleted ? (
                <p className="text-success m-0 fw-bold">Completed</p>
              ) : (
                <>
                  <img
                    onClick={() => cancleAppointment(item._id)}
                    src={assets.cancel_icon}
                    alt=""
                    style={{ width: "50px", cursor: "pointer" }}
                  />

                  <img
                    onClick={() => completeAppointment(item._id)}
                    src={assets.tick_icon}
                    alt=""
                    style={{ width: "50px", cursor: "pointer" }}
                  />
                </>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default DoctorAppointment;

