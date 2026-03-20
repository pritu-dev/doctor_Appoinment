import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Doctors from "./pages/Doctors.jsx";
import Login from "./pages/Login.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import MyAppoinments from "./pages/MyAppoinments.jsx";
import Appoinment from "./pages/Appoinment.jsx";
import Navbar from "./components/Navbar.jsx";
import SpecialityMenu from "./components/SpecialityMenu.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
    <ToastContainer />
    <Navbar/>
      <Routes>
        <Route path="/" element={< Home />}></Route>
        <Route path="/doctors" element={< Doctors />}></Route>
        <Route path="/doctors/:speciality" element={< Doctors />}></Route>
        <Route path="/login" element={< Login />}></Route>
        <Route path="/about" element={< About />}></Route>
        <Route path="/contact" element={< Contact />}></Route>
        <Route path="/my-profile" element={< MyProfile />}></Route>
        <Route path="/my-appoinments" element={< MyAppoinments />}></Route>
         <Route path="/speciality" element={< SpecialityMenu />}></Route>
        <Route path="/appoinment/:docId" element={< Appoinment />}></Route>

      </Routes>
    </>
  )
}

export default App
