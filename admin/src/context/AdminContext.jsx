import React, { createContext, useState, useEffect } from 'react';
import { toast } from "react-toastify";
import axios from "axios";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

  const [aToken, setAToken] = useState(localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [appoinments, setAllAppoinments] = useState([]);
  const [dashData, setDashData] = useState(false);

  // Get All Doctors
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/admin/all-doctors", {},
        { headers: { aToken } }
      );

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Change Availability
  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/all-appoinments", { headers: { aToken } });
      if (data.success) {
        setAllAppoinments(data.appoinments);
        toast(data.message);
      }
    }
    catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }

  const cancleAppointment = async (appointmentId) => {
    console.log(appointmentId);
    try {
      const { data } = await axios.post(backendUrl + "/api/admin/cancle-appoinments", { appointmentId }, { headers: { aToken } });

      if (data.success) {
        toast(data.message);
        getAllAppointments();
      }
      else {
        toast.error(data.message)
      }
    }
    catch (error) {
      toast.error(error.message);
    }
  }

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", { headers: { aToken } });

      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      }
      else {
        toast.error(data.message)
      }
    }
    catch (error) {
      toast.error(error.message);
    }
  }

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    getAllAppointments,
    appoinments,
    changeAvailability,
    cancleAppointment,
    getDashData,
    dashData
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;