// import React from 'react';
// import axios from "axios";
// import { AdminContext } from '../../context/AdminContext.jsx';
// import { useContext } from 'react';
// import { useEffect } from 'react';
// import { assets} from "../../assets/assets.js";

// const Dashboard = () => {
//     const { aToken, getDashData, dashData, completeAppointment, cancleAppointment } = useContext(AdminContext);

//     useEffect(() => {
//         if (aToken) {
//             getDashData();
//         }
//     }, [aToken]);

//    return (
//         <div className=''>
//              <div className="d-flex gap-5">
//                 <div>
//               <img src={assets.doctor_icon} alt="" />
//               <div>
//                 <p>Doctors</p>
//               <p>{dashData.doctors}</p>
//               </div>
//              </div>
//               <div>
//                  <img src={assets.appointments_icon} alt="" />
//                  <p>{dashData.appointments}</p>
//                  <p>Appointments</p>
//               </div>
//                <div>
//                   <img src={assets.patients_icon} alt="" />
//                   <p>{dashData.patients}</p>
//                   <p>Patients</p>
//                </div>
//          </div>

//          <div>
//             <h4>Latest Appoitnmets</h4>
//              {
//                 dashData.latestAppointments && dashData.latestAppointments.map((item,idx) => {
//                     return(
//                         <div className="border" key={idx} >
//                             <img src={assets.patients_icon} alt="" />
//                             <h4>{item.docData.name}</h4>
//                             <p>Booking on {item.slotDate}</p>
//                              {!item.cancelled ? <div> <img onClick={() => cancleAppointment(item._id)} src={assets.cancel_icon} alt="" /></div> : <p>Cancelled</p>}
//                        </div>


//                     )
//                 })
//              }
//          </div>
//         </div>
//     );
// }

// export default Dashboard;


import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext.jsx";
import { assets } from "../../assets/assets.js";

const Dashboard = () => {

  const { aToken, getDashData, dashData } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (

    <div className="container mt-4">

      {/* ===== Stats Cards ===== */}
      <div className="row g-4">

        {/* Earnings */}
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <div className="d-flex align-items-center gap-3">
              <img src={assets.doctor_icon} width="45" alt="" />
              <div>
                <h4 className="mb-0"> {dashData.doctors}</h4>
                <p className="text-muted mb-0">Doctors</p>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <div className="d-flex align-items-center gap-3">
              <img src={assets.appointments_icon} width="45" alt="" />
              <div>
                <h4 className="mb-0">{dashData?.appointments || 0}</h4>
                <p className="text-muted mb-0">Appointments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Patients */}
        <div className="col-md-4">
          <div className="card shadow-sm p-3">
            <div className="d-flex align-items-center gap-3">
              <img src={assets.patients_icon} width="45" alt="" />
              <div>
                <h4 className="mb-0">{dashData?.patients || 0}</h4>
                <p className="text-muted mb-0">Patients</p>
              </div>
            </div>
          </div>
        </div>

      </div>


      {/* ===== Latest Appointments ===== */}

      <div className="card mt-4 shadow-sm">

        <div className="card-header fw-bold">
          Latest Appointments
        </div>

        <div className="card-body">

          {dashData?.latestAppointments?.length > 0 ? (

            dashData.latestAppointments.map((item, idx) => (

              <div
                key={idx}
                className="d-flex justify-content-between align-items-center border-bottom py-3"
              >

                {/* Patient Info */}
                <div className="d-flex align-items-center gap-3">

                  <img
                    src={assets.patients_icon}
                    width="40"
                    style={{ borderRadius: "50%" }}
                    alt=""
                  />

                  <div>
                    <p className="mb-0 fw-semibold">
                      {item.userData?.name}
                    </p>

                    <small className="text-muted">
                      Booking on {item.slotDate} at {item.slotTime}
                    </small>
                  </div>

                </div>


                {/* Status Only */}

                {item.cancelled ? (
                  <span className="badge bg-danger">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="badge bg-success">
                    Completed
                  </span>
                ) : null}
              </div>

            ))

          ) : (

            <p className="text-muted text-center">
              No Appointments Found
            </p>

          )}

        </div>

      </div>

    </div>

  );
};

export default Dashboard;