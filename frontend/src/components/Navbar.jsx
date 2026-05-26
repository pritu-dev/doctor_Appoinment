import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { AppContext } from "../context/AppContextProvider.jsx";

const Navbar = () => {

  const navigate = useNavigate();
  const { token, setToken, userData, admin_url } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logOut = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="container">
      <div className="row align-items-center p-3 border-bottom-primary mb-2 border-bottom border-gray">
        {/* LOGO */}
        <div className="col-4">
          <img src={assets.logo} alt="logo" />
        </div>

        {/* NAV LINKS */}
        <div className="col-6">
          <ul className="d-flex list-unstyled gap-4 align-items-center mb-0">

            <li>
              <NavLink to="/" className="text-decoration-none text-dark">
                HOME
              </NavLink>
            </li>

            <li>
              <NavLink to="/doctors" className="text-decoration-none text-dark">
                ALL DOCTORS
              </NavLink>
            </li>

            <li>
              <NavLink to="/about" className="text-decoration-none text-dark">
                ABOUT
              </NavLink>
            </li>

            <li>
              <NavLink to="/contact" className="text-decoration-none text-dark">
                CONTACT
              </NavLink>
            </li>

            <li>
              <button className="btn rounded-pill border" 
              onClick={() => window.location.href = `${admin_url}/login`}>
                Admin Panel
              </button>
            </li>

          </ul>
        </div>

        {/* RIGHT SIDE */}
<div className="col-2">

  {token && userData ? (

    <div className="position-relative">
      <img
      className="rounded-circle" src={assets.profile_pic} style={{ width: "40px", cursor: "pointer" }}
      onClick={() => setShowMenu(!showMenu)}
      />

      {showMenu && (
        <div className="position-absolute top-100 end-0 bg-white shadow rounded p-2">
          <p className="mb-2" style={{cursor: "pointer"}} onClick={() => navigate("/my-profile")}>My Profile</p>
          <p className="mb-2" style={{cursor: "pointer"}} onClick={() => navigate("/my-appoinments")}> My Appointment </p>
          <p className="mb-0" style={{cursor: "pointer"}} onClick={logOut} > Logout</p>
        </div>
      )}
    </div>

  ) : (

    <button onClick={() => navigate("/login")} className="btn btn-primary rounded-pill px-4 py-2" style={{backgroundColor: "#5F6FFF",}}>Create Account</button>

  )}

</div>

      </div>
    </div>
  );
};

export default Navbar;

  