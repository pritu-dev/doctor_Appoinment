import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  if (!aToken && !dToken) {
    return null;
  }

  return (
    <>
      {/* Admin Sidebar */}
      {aToken && (
        <div className="bg-white border-end vh-100 p-3" style={{ width: "240px" }}>
          <ul className="nav nav-pills flex-column gap-2">

            <li className="nav-item">
              <NavLink to="/admin-dashboard" className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 ${isActive ? "active" : "text-dark"}`
              }>
                <img src={assets.home_icon} alt="" width="20" />
                <span>Dashboard</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/all-appoinments" className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 ${isActive ? "active" : "text-dark"}`
              }>
                <img src={assets.appointment_icon} alt="" width="20" />
                <span>Appointments</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/add-doctor" className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 ${isActive ? "active" : "text-dark"}`
              }>
                <img src={assets.add_icon} alt="" width="20" />
                <span>Add Doctor</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/doctor-list" className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 ${isActive ? "active" : "text-dark"}`
              }>
                <img src={assets.people_icon} alt="" width="20" />
                <span>Doctors List</span>
              </NavLink>
            </li>

          </ul>
        </div>
      )}

      {/* Doctor Sidebar */}
      {dToken && (
        <div className="bg-white border-end vh-100 p-3" style={{ width: "240px" }}>
          <ul className="nav nav-pills flex-column gap-2">

            <li className="nav-item">
              <NavLink to="/doctor-dashboard" className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 ${isActive ? "active" : "text-dark"}`
              }>
                <img src={assets.home_icon} alt="" width="20" />
                <span>Dashboard</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/doctor-appointments" className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 ${isActive ? "active" : "text-dark"}`
              }>
                <img src={assets.appointment_icon} alt="" width="20" />
                <span>Appointments</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/doctor-profile" className={({ isActive }) =>
                `nav-link d-flex align-items-center gap-2 ${isActive ? "active" : "text-dark"}`
              }>
                <img src={assets.people_icon} alt="" width="20" />
                <span>Doctor Profile</span>
              </NavLink>
            </li>

          </ul>
        </div>
      )}
    </>
  );
};

export default Sidebar;