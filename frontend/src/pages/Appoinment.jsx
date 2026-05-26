// import React, { useContext, useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { AppContext } from "../context/AppContextProvider";
// import RealatedDoc from "./RealatedDoc";
// import { toast } from "react-toastify";
// import axios from "axios";
// import { assets } from "../assets/assets.js"
// const Appoinment = () => {

//   const { docId } = useParams();
//   const navigate = useNavigate();
//   const { doctors, backendUrl, getDoctorData, token } = useContext(AppContext);

//   const [filterDoc, setFilterDoc] = useState(null);
//   const [docSlots, setDocSlot] = useState([]);
//   const [slotIndex, setSlotIndex] = useState(0);
//   const [slotTime, setSlotTime] = useState("");

//   // Find doctor
//   useEffect(() => {
//     const doctor = doctors.find((doc) => doc._id === docId);
//     setFilterDoc(doctor || null);
//   }, [docId, doctors]);

//   // Generate slots
//   useEffect(() => {
//     if (filterDoc) {
//       getAvailableSlot();
//     }
//   }, [filterDoc]);

//   const getAvailableSlot = () => {

//     setDocSlot([]);

//     let today = new Date();

//     for (let i = 0; i < 7; i++) {

//       let currentDate = new Date(today);
//       currentDate.setDate(today.getDate() + i);

//       let endTime = new Date(currentDate);
//       endTime.setHours(21, 0, 0, 0);

//       if (i === 0) {

//         currentDate.setHours(
//           currentDate.getHours() > 10
//             ? currentDate.getHours() + 1
//             : 10
//         );

//         currentDate.setMinutes(
//           currentDate.getMinutes() > 30 ? 30 : 0
//         );

//       }
//       else {

//         currentDate.setHours(10);
//         currentDate.setMinutes(0);

//       }

//       let timeSlot = [];

//       while (currentDate < endTime) {

//         let formattedTime = currentDate.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit"
//         });

//         let day = currentDate.getDate();
//         let month = currentDate.getMonth() + 1;
//         let year = currentDate.getFullYear();

//         const slotDate = day + "_" + month + "_" + year;

//         const isSlotAvailable =
//           filterDoc.slots_booked &&
//             filterDoc.slots_booked[slotDate] &&
//             filterDoc.slots_booked[slotDate].includes(formattedTime)
//             ? false
//             : true;

//         if (isSlotAvailable) {

//           timeSlot.push({
//             datetime: new Date(currentDate),
//             time: formattedTime
//           });

//         }

//         currentDate.setMinutes(currentDate.getMinutes() + 30);

//       }

//       setDocSlot((prev) => [...prev, timeSlot]);

//     }

//   };


//   const bookAppoinment = async () => {

//     if (!token) {
//       toast.warn("Login to book appointment");
//       return navigate("/login");
//     }

//     try {

//       const date = docSlots[slotIndex][0].datetime;

//       let day = date.getDate();
//       let month = date.getMonth() + 1;
//       let year = date.getFullYear();

//       const slotDate = day + "-" + month + "-" + year;

//       const { data } = await axios.post(
//         backendUrl + "/api/user/book-appoinment",
//         { docId, slotTime, slotDate },
//         { headers: { token } }
//       );

//       if (data.success) {

//         toast.success(data.message);
//         getDoctorData();
//         navigate("/my-appoinments");

//       }
//       else {

//         toast.error(data.message);

//       }

//     }
//     catch (error) {

//       toast.error(error.message);

//     }

//   };


//   if (!filterDoc) return <h4 className="text-center mt-5">Loading...</h4>;

//   // return (

//   //   <div className="container mt-5">

//   //     {/* Doctor Info */}

//   //     <div className="row align-items-center">

//   //       <div className="col-md-4">
//   //         <img
//   //           src={filterDoc.image}
//   //           alt=""
//   //           className="img-fluid rounded"
//   //         />
//   //       </div>

//   //       <div className="col-md-8">

//   //         <h2>{filterDoc.name}</h2>
//   //         <p className="text-muted">{filterDoc.speciality}</p>
//   //         <p>{filterDoc.degree}</p>
//   //         <p>{filterDoc.experience} Years Experience</p>
//   //         <h5 className="text-success">₹ {filterDoc.fees}</h5>

//   //       </div>

//   //     </div>

//   //     <hr />

//   //     {/* Date Selection */}

//       // <h4>Select Date</h4>

//       // <div className="d-flex gap-3 flex-wrap mt-3">

//       //   {docSlots.map((item, index) => (

//       //     <div
//       //       key={index}
//       //       onClick={() => {
//       //         setSlotIndex(index);
//       //         setSlotTime("");
//       //       }}
//       //       className={`p-3 border rounded text-center 
//       //         ${slotIndex === index ? "bg-primary text-white" : ""}
//       //       `}
//       //       style={{ cursor: "pointer", minWidth: "120px" }}
//       //     >

//       //       <p className="m-0 fw-bold">
//       //         {item[0] &&
//       //           item[0].datetime.toDateString().slice(0, 10)}
//       //       </p>

//       //     </div>

//       //   ))}

//       // </div>

//       // {/* Time Selection */}

//       // <h4 className="mt-4">Select Time</h4>

//       // <div className="d-flex flex-wrap gap-3 mt-3">

//       //   {docSlots[slotIndex]?.map((slot, index) => (

//       //     <button
//       //       key={index}
//       //       onClick={() => setSlotTime(slot.time)}
//       //       className={`btn 
//       //       ${slotTime === slot.time
//       //           ? "btn-success"
//       //           : "btn-outline-primary"}
//       //       `}
//       //     >

//       //       {slot.time}

//       //     </button>

//       //   ))}

//       // </div>

//   //     {/* Book Button */}

//   //     <button
//   //       className="btn btn-primary mt-4"
//   //       onClick={bookAppoinment}
//   //     >
//   //       Book Appointment
//   //     </button>

//   //     <hr />

//   //     <RealatedDoc filterDoc={filterDoc} />

//   //   </div>
//   // );

//   return (
//     <div className="container">
//       <div className="row m-4">
//         <div className="col-5">

//         </div>
//         <div className="col p-4">
//           <div className="border border-gray rounded-3 p-3 px-5">
//             <h2>{filterDoc.name} <img src={assets.verified_icon} alt="" /></h2>
//             <p>{filterDoc.education}
//               <span>- {filterDoc.speciality}
//                 <span className="border rounded-pill p-1 ms-3">{filterDoc.experience}
//                 </span></span>
//             </p>
//             <h6>About <img src={assets.info_icon} alt="" /></h6>
//             <p>{filterDoc.about}</p>
//             <h5 className="text-success">Appointment fees: <span className="text-dark"> $ {filterDoc.fees}</span></h5>
//           </div>

//           <div>
//                <h6>Booking Slots</h6>
//                <h4>Select Date</h4>

//       <div className="d-flex gap-3 flex-wrap mt-3">

//         {docSlots.map((item, index) => (

//           <div
//             key={index}
//             onClick={() => {
//               setSlotIndex(index);
//               setSlotTime("");
//             }}
//             className={`p-3 border rounded text-center 
//               ${slotIndex === index ? "bg-primary text-white" : ""}
//             `}
//             style={{ cursor: "pointer", minWidth: "120px" }}
//           >

//             <p className="m-0 fw-bold">
//               {item[0] &&
//                 item[0].datetime.toDateString().slice(0, 10)}
//             </p>

//           </div>

//         ))}

//       </div>

//           </div>

//         </div>

//       </div>
//     </div>
//   )
// };

// export default Appoinment;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";
import RealatedDoc from "./RealatedDoc";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../assets/assets.js";

const Appoinment = () => {

  const { docId } = useParams();
  const navigate = useNavigate();

  const { doctors, backendUrl, getDoctorData, token } = useContext(AppContext);

  const [filterDoc, setFilterDoc] = useState(null);
  const [docSlots, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // find doctor
  useEffect(() => {
    const doctor = doctors.find((doc) => doc._id === docId);
    setFilterDoc(doctor || null);
  }, [docId, doctors]);

  // generate slots
  useEffect(() => {
    if (filterDoc) {
      getAvailableSlot();
    }
  }, [filterDoc]);

  const getAvailableSlot = () => {

    setDocSlot([]);

    let today = new Date();
    console.log("today",today);

    for (let i = 0; i < 7; i++) {

      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {

        currentDate.setHours(
          currentDate.getHours() > 10
            ? currentDate.getHours() + 1
            : 10
        );

        currentDate.setMinutes(
          currentDate.getMinutes() > 30 ? 30 : 0
        );

      } else {

        currentDate.setHours(10);
        currentDate.setMinutes(0);

      }

      let timeSlot = [];

      while (currentDate < endTime) {

        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "-" + month + "-" + year;

        const isSlotAvailable =
          filterDoc.slots_booked &&
          filterDoc.slots_booked[slotDate] &&
          filterDoc.slots_booked[slotDate].includes(formattedTime)
            ? false
            : true;

        if (isSlotAvailable) {

          timeSlot.push({
            datetime: new Date(currentDate),
            time: formattedTime
          });

        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);

      }

      setDocSlot((prev) => [...prev, timeSlot]);

    }

  };

  const bookAppoinment = async () => {

    if (!token) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    try {

      const date = docSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "-" + month + "-" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appoinment", { docId, slotTime, slotDate }, { headers: { token } }
      );

      if (data.success) {

        toast.success(data.message);
        getDoctorData();
        navigate("/my-appoinments");

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      toast.error(error.message);

    }

  };

  if (!filterDoc) return <h4 className="text-center mt-5">Loading...</h4>;

  return (

    <div className="container mt-5 mb-5">

      <div className="row mb-5">

        {/* Doctor Image */}

        <div className="col-md-5">

          <img
            src={filterDoc.image}
            alt=""
            className="w-75"
          />

        </div>


        {/* Doctor Info */}

        <div className="col-md-7">

          <div className="border rounded-3 p-4">

            <h3 style={{color:"#374151"}}>
              {filterDoc.name}
              <img src={assets.verified_icon} alt="" className="ms-2"/>
            </h3>

            <p style={{color:"#4B5563"}}>
              {filterDoc.education}

              <span className="ms-2" style={{color:"#4B5563"}}>
                - {filterDoc.speciality}
              </span>

              <span className="border rounded-pill px-2 py-1 ms-3 " style={{color:"#4B5563"}}>
                {filterDoc.experience}
              </span>

            </p>

            <h6>
              About
              <img src={assets.info_icon} alt="" className="ms-2"/>
            </h6>

            <p style={{color:"#4B5563"}}>{filterDoc.about}</p>

            <h5 className="text-success">
              Appointment fees :
              <span className="text-dark"> $ {filterDoc.fees}</span>
            </h5>

          </div>


          {/* Slots */}

          <div className="mt-4 px-4">
            <p style={{color:"#4B5563"}} >Booking Slots</p>

            <div className="d-flex gap-3 flex-wrap">

              {docSlots.map((item, index) => (

                <div
                  key={index}
                  onClick={() => {
                    setSlotIndex(index);
                    setSlotTime("");
                  }}
                  className={`px-3 py-2 border rounded-pill text-center
                  ${slotIndex === index ? "bg-primary text-white" : ""}`}
                  style={{ cursor: "pointer", minWidth: "70px" }}
                >

                  <p className="m-0 fw-bold">

                    {item[0] &&
                      item[0].datetime.toLocaleDateString("en-US", {
                        weekday: "short"
                      })}

                  </p>

                  <p className="m-0">

                    {item[0] &&
                      item[0].datetime.getDate()}

                  </p>
                </div>

              ))}

            </div>


            {/* Time Slots */}

            <div className="d-flex flex-wrap gap-2 mt-4">

              {docSlots[slotIndex]?.map((slot, index) => (

                <button
                  key={index}
                  onClick={() => setSlotTime(slot.time)}
                  className={`btn btn-sm
                  ${slotTime === slot.time
                      ? "btn-primary"
                      : "btn-outline-primary"
                    }`}
                >

                  {slot.time}

                </button>

              ))}

            </div>


            <button
              className="btn btn-primary mt-4 px-4"
              onClick={bookAppoinment}
            >
               Book Appointment

            </button>
          </div>
        </div>
      </div>

      <RealatedDoc filterDoc={filterDoc} />

    </div>

  );
};

export default Appoinment;