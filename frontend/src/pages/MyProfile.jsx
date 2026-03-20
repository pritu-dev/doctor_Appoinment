// import React, { useContext, useEffect, useState } from "react";
// import { AppContext } from "../context/AppContextProvider";
// import axios from "axios";
// import { toast } from "react-toastify";

// const MyProfile = () => {

//   const { userData, backendUrl, token, loadUserProfileData } = useContext(AppContext);

//   const [isEdit, setIsEdit] = useState(false);
//   const [image, setImage] = useState(false);

//   // const [formData, setFormData] = useState({
//   //   name: "",
//   //   email: "",
//   //   phone: "",
//   //   // address: "",
//   //   gender: "",
//   //   dob: ""
//   // });

//   // // userData आने पर formData update
//   // useEffect(() => {
//   //   if (userData) {
//   //     setFormData({
//   //       name: userData.name || "",
//   //       email: userData.email || "",
//   //       phone: userData.phone || "",
//   //       // address: userData.address || "",
//   //       gender: userData.gender || "",
//   //       dob: userData.dob || ""
//   //     });
//   //   }
//   // }, [userData]);

//   // // input change
//   // const handleChange = (event) => {
//   //   setFormData((prev) => ({
//   //     ...prev,
//   //     [event.target.name]: event.target.value
//   //   }));
//   // };

//   // update profile
//   const updateUserProfileData = async () => {
//     try {

//       const formDataObj = new FormData();

//       formDataObj.append("name", userData.name);
//       formDataObj.append("phone", userData.phone);
//       formDataObj.append("gender", userData.gender);
//       formDataObj.append("dob", userData.dob);

//       if (image) {
//         formDataObj.append("image", image);
//       }

//       const { data } = await axios.post(backendUrl + "/api/user/update-profile",formDataObj,
//         { headers: { token } }
//       );

//       if (data.success) {
//         toast.success(data.message);
//         await loadUserProfileData();
//         setIsEdit(false);
//         setImage(false);
//       } else {
//         toast.error(data.message);
//       }

//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   return userData && (
//     <div className="container mt-5 text-center">

//       {/* Profile Image */}

//       <div>
//         <label htmlFor="image">
//           <img
//             src={
//               image
//                 ? URL.createObjectURL(image)
//                 : userData.image
//             }
//             alt="profile"
//             width="150"
//             style={{ borderRadius: "50%", cursor: "pointer" }}
//           />
//         </label>

//         {isEdit && (
//           <input
//             type="file"
//             id="image"
//             hidden
//             onChange={(e) => setImage(e.target.files[0])}
//           />
//         )}
//       </div>

//       <h3 className="mt-3">{userData.name}</h3>

//       <hr />

//       {/* CONTACT INFO */}

//       <h4>CONTACT INFORMATION</h4>

//       <div>

//         <p>
//           Email :
//           {isEdit ? (
//             <input
//               type="text"
//               name="email"
//               value={userData.email}
//               onChange={handleChange}
//             />
//           ) : (
//             <span> {userData.email}</span>
//           )}
//         </p>

//         <p>
//           Phone :
//           {isEdit ? (
//             <input
//               type="text"
//               name="phone"
//               value={userData.phone}
//               onChange={handleChange}
//             />
//           ) : (
//             <span> {userData.phone}</span>
//           )}
//         </p>

//         {/* <p>
//           Address :
//           {isEdit ? (
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//             />
//           ) : (
//             <span> {formData.address}</span>
//           )}
//         </p> */}

//       </div>

//       <hr />

//       {/* BASIC INFO */}

//       <h4>BASIC INFORMATION</h4>

//       <div>

//         <p>
//           Gender :
//           {isEdit ? (
//             <input
//               type="text"
//               name="gender"
//               value={userData.gender}
//               onChange={handleChange}
//             />
//           ) : (
//             <span> {userData.gender}</span>
//           )}
//         </p>

//         <p>
//           BirthDay :
//           {isEdit ? (
//             <input
//               type="date"
//               name="dob"
//               value={userData.dob}
//               onChange={handleChange}
//             />
//           ) : (
//             <span> {userData.dob}</span>
//           )}
//         </p>

//       </div>

//       {/* BUTTONS */}

//       {!isEdit ? (
//         <button
//           className="btn btn-primary"
//           onClick={() => setIsEdit(true)}
//         >
//           Edit
//         </button>
//       ) : (
//         <button
//           className="btn btn-success"
//           onClick={updateUserProfileData}
//         >
//           Save Information
//         </button>
//       )}

//     </div>
//   );
// };

// export default MyProfile;


import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { assets} from "../assets/assets.js";
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
const navigate = useNavigate();
  const { userData, backendUrl, token, loadUserProfileData } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: ""
  });

  // userData आने पर formData fill करना
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        gender: userData.gender || "",
        dob: userData.dob || ""
      });
    }
  }, [userData]);

  // input change handle
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // update profile
  const updateUserProfileData = async () => {
    try {

      const formDataObj = new FormData();

      formDataObj.append("name", formData.name);
      formDataObj.append("phone", formData.phone);
      formDataObj.append("gender", formData.gender);
      formDataObj.append("dob", formData.dob);

      if (image) {
        formDataObj.append("image", image);
      }

      const { data } = await axios.post(backendUrl + "/api/user/update-profile",formDataObj,
      { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/")
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  if (!userData) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
  <div className="container  d-flex justify-content-center align-items-center" >

    <div className="card shadow p-4" style={{ width: "500px" }}>

      {/* PROFILE IMAGE */}

      <div className="text-center">
        <label htmlFor="image">
          <img
            src={assets.upload_area}
            alt="profile"
            width="100"
            style={{ objectFit: "cover", cursor: "pointer" }}
          />
        </label>

        {isEdit && (
          <input
            type="file"
            id="image"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        )}

        <h4 className="mt-3">{formData.name}</h4>
      </div>

      <hr />

      {/* CONTACT INFORMATION */}

      <h5 className="text-primary">Contact Information</h5>

      <div>

        <label className="fw-bold">Email</label>

        {isEdit ? (
          <input
            type="text"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        ) : (
          <p>{formData.email}</p>
        )}

      </div>

      <div className="">

        <label className="fw-bold">Phone</label>

        {isEdit ? (
          <input
            type="text"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        ) : (
          <p>{formData.phone}</p>
        )}

      </div>

      <hr />

      {/* BASIC INFORMATION */}

      <h5 className="text-primary">Basic Information</h5>

      <div className="">

        <label className="fw-bold">Gender</label>

        {isEdit ? (
          <select
            className="form-select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        ) : (
          <p>{formData.gender}</p>
        )}

      </div>

      <div className="">

        <label className="fw-bold">Date of Birth</label>

        {isEdit ? (
          <input
            type="date"
            className="form-control"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        ) : (
          <p>{formData.dob}</p>
        )}

      </div>

      {/* BUTTONS */}

      <div className="text-center mt-3">

        {!isEdit ? (

          <button
            className="btn btn-primary px-4"
            onClick={() => setIsEdit(true)}
          >
            Edit Profile
          </button>

        ) : (

          <>
            <button
              className="btn btn-success px-4"
              onClick={updateUserProfileData}
            >
              Save
            </button>

            <button
              className="btn btn-secondary ms-2"
              onClick={() => setIsEdit(false)}
            >
              Cancel
            </button>
          </>

        )}

      </div>

    </div>

  </div>
);
};

export default MyProfile;