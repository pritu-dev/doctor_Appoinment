import React, { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const MyAppoinments = () => {
  const { backendUrl, token, setToken, getDoctorData } = useContext(AppContext);
  const [appoinments, setAppoinments] = useState([]);

  const getUserAppoinments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appoinments", { headers: { token } });

      if (data.success) {
        setAppoinments(data.appoinments.reverse());
        // console.log(data.appoinments);
      }
    }
    catch (error) {
      toast.error(error.message);
    }
  }

  const cancleAppointment = async (appointmentId) => {
    try {
      console.log(appointmentId);
      const { data } = await axios.post(backendUrl + "/api/user/cancle-appointment", { appointmentId }, { headers: { token } });
      if (data.success) {
        toast.success(data.message);
        getUserAppoinments();
        getDoctorData();
      }
      else {
        toast.error(data.message);
      }
    }
    catch (error) {
      toast.error(error.message)
    }


  }

  const initPay = (order) => {
    const options = {
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appoinment Payment",
      description : "Appoinment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (responce) => {
         console.log(responce);
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open();
  }

  const appoinmentRazorpay = async (appointmentId) => {
    try{
      const {data} = await axios.post(backendUrl+"/api/user/payment-razorpay", {appointmentId}, {headers:{token}});
      if(data.success){
        console.log(data.order);
        initPay(data.order);
      }
    }
    catch(error){
      toast.error(error.message)
    }
 
  }

  useEffect(() => {
    if (token) {
      getUserAppoinments();
    }
  }, [token])

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold">My Appointments</h2>

      {appoinments.map((item, index) => (
        <div
          key={index}
          className="card mb-4 shadow-sm border-0 rounded-4"
        >
          <div className="card-body d-flex justify-content-between align-items-center">

            {/* Left Section */}
            <div className="d-flex gap-4 align-items-center">

              <img
                src={item.docData.image}
                alt=""
                className="rounded-3"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                }}
              />

              <div>
                <h5 className="fw-semibold mb-1">{item.docData.name}</h5>
                <p className="text-muted mb-1">
                  {item.docData.speciality}
                </p>
                <p className="mb-1">
                  {item.docData.address.line1}
                </p> 
                 <p className="mb-2">
                  {item.docData.address.line2}
                </p>
                <p className="mb-0">
                  <strong>Date & Time:</strong>{" "}
                  <span className="text-primary fw-semibold">
                    {item.slotDate} | {item.slotTime}
                  </span>
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="d-flex flex-column gap-2">
              
              {!item.cancelled && item.payment && !item.isCompleted &&<button>Paid</button>}
              {!item.cancelled && !item.payment && !item.isCompleted && (<button onClick={() => appoinmentRazorpay(item._id)} className="btn btn-primary"> Pay Now </button>)}
              {!item.cancelled  && !item.isCompleted && <button onClick={() => cancleAppointment(item._id)} className="btn btn-outline-danger"> Cancel </button> }
              {item.cancelled  && !item.isCompleted &&<button className="btn btn-outline-danger">Appointment Cancelled</button>}
              {item.isCompleted && <button className="btn btn-outline-success">Complted</button>}
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAppoinments;