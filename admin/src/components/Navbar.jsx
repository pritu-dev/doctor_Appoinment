import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext.jsx";
import { AppContext } from "../context/AppContext.jsx";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const { frontend_url } = useContext(AppContext);

  const logout = () => {
    setAToken("");
    setDToken("");
    localStorage.removeItem("aToken");
    localStorage.removeItem("dToken");
    window.location.href = frontend_url
  };

  return (
    <nav className="navbar bg-white border-bottom px-4 py-3">

      <div className="container-fluid d-flex align-items-center">

        {/* Left Side */}
        <div className="d-flex align-items-center gap-3">
          <img src={assets.admin_logo} alt="logo" height="38" />

          <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill">
             { aToken ? <>  Admin Panel</> : <>Doctor Pannel</>}
          </span>
        </div>

        {/* Right Side */}
        <div className="d-flex align-items-center gap-3 ms-auto">

          <span className="fw-medium text-dark">
            {aToken ? "Admin" : "Doctor"}
          </span>

          <button
            onClick={logout}
            className="btn btn-outline-primary px-3"
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;