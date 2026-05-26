import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext.jsx";
import { AppContext } from "../context/AppContext.jsx";

const Navbar = () => {

  const { aToken, setAToken } = useContext(AdminContext);

  const { dToken, setDToken } = useContext(DoctorContext);

  const { frontend_url } = useContext(AppContext);

  const [mobileMenu, setMobileMenu] = useState(false);

  const logout = () => {

    setAToken("");

    setDToken("");

    localStorage.removeItem("aToken");

    localStorage.removeItem("dToken");

    window.location.href = frontend_url;
  };

  return (

    <nav className="navbar bg-white border-bottom px-3 px-md-4 py-3">

      <div className="container-fluid">

        {/* ================= TOP NAV ================= */}

        <div className="d-flex justify-content-between align-items-center w-100">

          {/* ================= LEFT SIDE ================= */}

          <div className="d-flex align-items-center gap-2 gap-md-3">

            <img
              src={assets.admin_logo}
              alt="logo"
              style={{
                height: "38px",
                width: "auto",
              }}
            />

            <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill">

              {aToken ? "Admin Panel" : "Doctor Panel"}

            </span>

          </div>

          {/* ================= DESKTOP RIGHT SIDE ================= */}

          <div className="d-none d-md-flex align-items-center gap-3 ms-auto">

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

          {/* ================= MOBILE MENU BUTTON ================= */}

          <button
            className="btn d-md-none"
            onClick={() => setMobileMenu(!mobileMenu)}
          >

            <span style={{ fontSize: "28px" }}>
              ☰
            </span>

          </button>

        </div>

        {/* ================= MOBILE MENU ================= */}

        {mobileMenu && (

          <div className="d-md-none w-100 mt-3 bg-light rounded-4 p-3 shadow-sm">

            <div className="d-flex flex-column gap-3">

              <span className="fw-medium text-dark">

                {aToken ? "Admin" : "Doctor"}

              </span>

              <button
                onClick={logout}
                className="btn btn-outline-primary w-100"
              >
                Logout
              </button>

            </div>

          </div>

        )}

      </div>

    </nav>
  );
};

export default Navbar;