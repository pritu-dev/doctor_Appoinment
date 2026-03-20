// import React, { useContext, useState } from 'react';
// import axios from "axios";
// import { AppContext } from '../context/AppContextProvider';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const navigate = useNavigate();
//     const [state, setState] = useState("Create Account");
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const { backendUrl, token, setToken } = useContext(AppContext);

//     const onSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (state == "Create Account") {
//                 const { data } = await axios.post(backendUrl + "/api/user/register", { name, email, password });
//                 if (data.success) {
//                     localStorage.setItem("token", data.token);
//                     setToken(data.token);
//                     setName("");
//                     setEmail("");
//                     setPassword("");
//                     toast.success("Registerd Successfully")
//                 }
//                 else {
//                     toast.error(data.message)
//                 }
//             }

//             else {
//                 const { data } = await axios.post(backendUrl + "/api/user/login", { email, password });
//                 if (data.success) {
//                     localStorage.setItem("token", data.token);
//                     setToken(data.token);
//                     navigate("/");
//                     toast.success("Login Successfully")
//                 }
//                 else {
//                     toast.error(data.message)
//                 }
//             }
//         }

//         catch (error) {
//             toast.error(error.message);
//         }


//     }

//     return (
//         <div className='d-flex flex-column align-items-center mb-0 '>

//             <form onSubmit={onSubmit} style={{backgroundColor:"#FFFFFF"}}className='align-items-center py-2w-25 border px-4 py-3'>

//                 <div>
//                 <h3 className="fw-bold" style={{ color: "#5E5E5E" }}>{state}</h3>
//                 <p style={{ color: "#5E5E5E" }}>
//                     {
//                         state === "Create Account"
//                             ? "Please sign up to book appointment"
//                             : "Please log in to book appointment"
//                     }
//                 </p>
//             </div>
//                 {
//                     state === "Create Account" && (
//                         <div>
//                             <>
//                                 <label htmlFor="">fullname</label><br />
//                                 <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} name="name" value={name} /><br />
//                             </>
//                         </div>
//                     )
//                 }
//                 <div>
//                     <label htmlFor="">Email</label>
//                     <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} name="email" value={email} /><br />
//                 </div>

//                 <div>
//                     <label htmlFor="">Password</label>
//                     <input type="text" className="form-control" onChange={(e) => setPassword(e.target.value)} name="password" value={password} /><br />

//                 </div>
//                 {
//                     state === "Create Account"
//                         ? (
//                             <div>
//                                 <button className="border-0 text-light px-5 py-2 mb-3 ms-4 rounded-2" style={{ backgroundColor: "#5F6FFF" }}>{state}</button><br />
//                                 <p>Already have an account? <a href="#" onClick={() => setState("login")}>Login here</a></p><br />
//                             </div>
//                         )
//                         : <div>
//                             <button>{state}</button><br />
//                             <p>Create an new account? <a href="#" onClick={() => setState("Create Account")}>Click here</a></p><br />
//                         </div>
//                 }
//             </form>

//         </div>
//     );

//     // return(
//     //     <form>
//     //        <h3>{state}</h3>
//     //        <label htmlFor="name"></label>

//     //     </form>
//     // )
// }

// export default Login;

// // import React from 'react';
// // import { useState } from 'react';

// // const Login = () => {
// //     const [state, setState] = useState("Create Account");

// //     return (
// //         <div>
// //             <h2>{state}</h2>
// //         </div>
// //     );
// // }

// // export default Login;

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