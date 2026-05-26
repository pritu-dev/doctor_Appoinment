import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from "../../assets/assets.js";

const DoctorDashboard = () => {
  const { dToken, getDashData, dashData, setDashData, completeAppointment, cancleAppointment } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return dashData && (
    <div className=''>
      <div className="d-flex gap-5 rounded-3" >
        <div className='d-flex border p-3 rounded-2' style={{ backgroundColor: "#FFFFFF" }}>
          <div>
            <img src={assets.earning_icon} alt="" />
          </div>
          <div>
            <p className='fw-bold fs-5 mb-0'> ₹ {dashData.earnings}</p>
            <p>Earnings</p>
          </div>
        </div>

        <div className='d-flex border p-3 rounded-2' style={{ backgroundColor: "#FFFFFF" }}>
          <div>
            <img src={assets.appointments_icon} alt="" />
          </div>
          <div>
            <p className='fw-bold fs-5 mb-0'>{dashData.appointments}</p>
            <p>Appointments</p>
          </div>
        </div>

        <div className='d-flex border p-3 rounded-2' style={{ backgroundColor: "#FFFFFF" }}>
          <div>
            <img src={assets.patients_icon} alt="" />
          </div>
          <div>
            <p className='fw-bold fs-5 mb-0'>{dashData.patients}</p>
            <p>Patients</p>
          </div>
        </div>
      </div>
      <div>

      {/* Latest Appoitnmets */}

        <div className='mt-5'>
          <h4>Latest Appoitnmets</h4>
          {
            dashData.latestAppointments &&
            dashData.latestAppointments.map((item, idx) => {
              return (

                <div className='d-flex justify-content-between mt-4 w-75 border p-2'  style={{ backgroundColor: "#FFFFFF" }}>
                  <div className='d-flex align-items-center' >
                    <div>
                      <img src={assets.patients_icon} alt="" />
                    </div>
                    <div>
                      <h6 className='mb-0'>{item.userData.name}</h6>
                      <p className='mb-0'> {item.slotDate}</p>
                    </div>
                  </div>

                  <div className='d-flex align-items-center px-5 '>
                    {
                      item.cancelled ? <p className='text-danger fw-bold '>Cancelled</p> : item.isCompleted ? <p className='text-success fw-bold '>Done</p> : <div>
                        <img onClick={() => cancleAppointment(item._id)} src={assets.cancel_icon}></img>
                        <img onClick={() => completeAppointment(item._id)} src={assets.tick_icon}></img>
                      </div>
                    }
                  </div>
                </div>


              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;


