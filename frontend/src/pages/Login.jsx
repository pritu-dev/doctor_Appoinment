import React, { useContext, useState } from 'react';
import axios from "axios";
import { AppContext } from '../context/AppContextProvider';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [state, setState] = useState("Create Account");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { backendUrl, token, setToken } = useContext(AppContext);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (state == "Create Account") {
                const { data } = await axios.post(backendUrl + "/api/user/register", { name, email, password });
                if (data.success) {
                    localStorage.setItem("token", data.token);
                    setToken(data.token);
                    setName("");
                    setEmail("");
                    setPassword("");
                    navigate("/my-profile");
                    toast.success("Registerd Successfully and Complete your Profile")
                }
                else {
                    toast.error(data.message)
                }
            }

            else {
                const { data } = await axios.post(backendUrl + "/api/user/login", { email, password });
                if (data.success) {
                    localStorage.setItem("token", data.token);
                    setToken(data.token);
                     navigate("/");
                    toast.success("Login Successfully")
                }
                else {
                    toast.error(data.message)
                }
            }
        }

        catch (error) {
            toast.error(error.message);
        }


    }
  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100"

    >
      <form
        onSubmit={onSubmit}
        className="w-100 p-4 border rounded shadow bg-white"
        style={{ maxWidth: "400px" }}
      >
        <h3 className="text-center fw-bold mb-3">
          {state}
        </h3>
        <p className="text-center text-secondary mb-4">
          {state === "Create Account"
            ? "Sign up to book your appointment"
            : "Log in to book your appointment"}
        </p>

        {state === "Create Account" && (
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"

              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="d-grid mb-3">
          <button
            type="submit"
            className={`btn ${state === "Create Account" ? "btn-primary" : "btn-success"}`}
          >
            {state}
          </button>
        </div>

        <p className="text-center mb-0">
          {state === "Create Account" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => setState("Create Account")}
                style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
              >
                Create one
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;