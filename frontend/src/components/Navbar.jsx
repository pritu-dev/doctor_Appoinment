import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { AppContext } from "../context/AppContextProvider.jsx";

const Navbar = () => {

  const navigate = useNavigate();

  const { token, setToken, userData, admin_url } =
    useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const logOut = () => {

    setToken(false);

    localStorage.removeItem("token");

    navigate("/");
  };

  return (

    <div className="container-fluid px-3 px-md-4">

      {/* ================= NAVBAR ================= */}

      <div className="d-flex justify-content-between align-items-center py-3 border-bottom">

        {/* ================= LOGO ================= */}

        <img
          src={assets.logo}
          alt="logo"
          style={{
            width: "140px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        />

        {/* ================= DESKTOP + TABLET MENU ================= */}

        <ul className="d-none d-md-flex list-unstyled gap-3 gap-lg-4 align-items-center mb-0">

          <li>
            <NavLink
              to="/"
              className="text-decoration-none text-dark fw-semibold"
            >
              HOME
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/doctors"
              className="text-decoration-none text-dark fw-semibold"
            >
              ALL DOCTORS
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className="text-decoration-none text-dark fw-semibold"
            >
              ABOUT
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className="text-decoration-none text-dark fw-semibold"
            >
              CONTACT
            </NavLink>
          </li>

          <li>

            <button
              className="btn border rounded-pill px-3 py-2"
              onClick={() =>
                (window.location.href = `${admin_url}/login`)
              }
            >
              Admin Panel
            </button>

          </li>

        </ul>

        {/* ================= RIGHT SIDE ================= */}

        <div className="d-flex align-items-center gap-3">

          {/* ================= USER ================= */}

          {token && userData ? (

            <div className="position-relative">

              <img
                src={assets.profile_pic}
                alt="profile"
                className="rounded-circle"
                style={{
                  width: "40px",
                  height: "40px",
                  cursor: "pointer",
                }}
                onClick={() => setShowMenu(!showMenu)}
              />

              {/* ================= DROPDOWN ================= */}

              {showMenu && (

                <div
                  className="position-absolute end-0 top-100 bg-white shadow rounded p-3 mt-2"
                  style={{
                    minWidth: "180px",
                    zIndex: 100,
                  }}
                >

                  <p
                    className="mb-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate("/my-profile");
                      setShowMenu(false);
                    }}
                  >
                    My Profile
                  </p>

                  <p
                    className="mb-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate("/my-appoinments");
                      setShowMenu(false);
                    }}
                  >
                    My Appointments
                  </p>

                  <p
                    className="mb-0 text-danger"
                    style={{ cursor: "pointer" }}
                    onClick={logOut}
                  >
                    Logout
                  </p>

                </div>

              )}

            </div>

          ) : (

            <button
              onClick={() => navigate("/login")}
              className="btn btn-primary rounded-pill px-4 py-2 d-none d-md-block"
              style={{
                backgroundColor: "#5F6FFF",
                border: "none",
              }}
            >
              Create Account
            </button>

          )}

          {/* ================= MOBILE MENU BUTTON ================= */}

          <button
            className="btn d-md-none"
            onClick={() => setMobileMenu(!mobileMenu)}
          >

            <span style={{ fontSize: "30px" }}>
              ☰
            </span>

          </button>

        </div>

      </div>

      {/* ================= MOBILE MENU ================= */}

      {mobileMenu && (

        <div className="d-md-none bg-white shadow rounded-4 p-4 mt-3">

          <ul className="list-unstyled d-flex flex-column gap-3 mb-0">

            <li>

              <NavLink
                to="/"
                className="text-decoration-none text-dark fw-semibold"
                onClick={() => setMobileMenu(false)}
              >
                HOME
              </NavLink>

            </li>

            <li>

              <NavLink
                to="/doctors"
                className="text-decoration-none text-dark fw-semibold"
                onClick={() => setMobileMenu(false)}
              >
                ALL DOCTORS
              </NavLink>

            </li>

            <li>

              <NavLink
                to="/about"
                className="text-decoration-none text-dark fw-semibold"
                onClick={() => setMobileMenu(false)}
              >
                ABOUT
              </NavLink>

            </li>

            <li>

              <NavLink
                to="/contact"
                className="text-decoration-none text-dark fw-semibold"
                onClick={() => setMobileMenu(false)}
              >
                CONTACT
              </NavLink>

            </li>

            {!token && (

              <li>

                <button
                  onClick={() => {
                    navigate("/login");
                    setMobileMenu(false);
                  }}
                  className="btn btn-primary rounded-pill w-100"
                  style={{
                    backgroundColor: "#5F6FFF",
                    border: "none",
                  }}
                >
                  Create Account
                </button>

              </li>

            )}

            <li>

              <button
                className="btn border rounded-pill w-100"
                onClick={() =>
                  (window.location.href = `${admin_url}/login`)
                }
              >
                Admin Panel
              </button>

            </li>

          </ul>

        </div>

      )}

    </div>
  );
};

export default Navbar;