import { useContext } from "react";
import Login from "./pages/Login.jsx";
import Navbar from "./components/Navbar.jsx";
import { AdminContext } from "./context/AdminContext.jsx";
import { DoctorContext } from "./context/DoctorContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/Sidebar.jsx";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import AllAppoinment from "./pages/Admin/AllAppoinment.jsx";
import AddDoctor from "./pages/Admin/AddDoctor.jsx";
import DoctorsList from "./pages/Admin/DoctorsList.jsx";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard.jsx";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment.jsx";
import DoctorProfile from "./pages/Doctor/DoctorProfile.jsx";

function App() {

  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <>
      <ToastContainer />

      {aToken || dToken ? (
  <div style={{ minHeight: "100vh", background: "#f5f7fb" }}>

    <Navbar />

    <div className="d-flex">
      <Sidebar />

      <div className="flex-grow-1 p-4">
        <Routes>

          {aToken && (
            <>
               <Route path="/admin-login" element={<Login />} />
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/all-appoinments" element={<AllAppoinment />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/doctor-list" element={<DoctorsList />} />
            </>
          )}

          {dToken && (
            <>
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor-appointments" element={<DoctorAppointment />} />
              <Route path="/doctor-profile" element={<DoctorProfile />} />
            </>
          )}

        </Routes>
      </div>

    </div>
  </div>
) : (
  <Login />
)}
    </>
  );
}

export default App;