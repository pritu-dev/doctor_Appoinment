import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext.jsx";

const AddDoctor = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [education, setEducation] = useState("");
  const [fees, setFees] = useState("");
  const [address, setAddress] = useState({
    line1: "",
    line2: ""
  });
  const { backendUrl } = useContext(AdminContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", fees);
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("education", education);

      formData.append(
        "address",
        JSON.stringify({
          line1: address.line1,
          line2: address.line2,
        })
      );

      formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        {
          headers: {
            atoken: localStorage.getItem("aToken"),
          },
        }
      );

      if (data.success) {
        toast.success(data.message);

        // reset
        setName("");
        setEmail("");
        setPassword("");
        setAbout("");
        setExperience("");
        setFees("");
        setSpeciality("");
        setEducation("");
        setAddress({ line1: "", line2: "" });
        setImage(null);
      } 
      else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="container-fluid bg-light p-4">
      <h4 className="mb-4 fw-semibold">Add Doctor</h4>

      <div className="card shadow-sm border-0 rounded-3 p-4">
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <div className="row g-4">

            <div className="col-12">
              <label className="form-label">Doctor Image</label>
              <input
                type="file"
                className="form-control"
                name="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Doctor Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>


            <div className="col-md-6">
              <label className="form-label">Speciality</label>
              <select
                className="form-select"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
              >
                <option value="">Select Speciality</option>
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Doctor Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@prescripto.com"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Education</label>
              <input
                type="text"
                className="form-control"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="Education"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Doctor Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
              />
            </div>



            <div className="col-md-6">
              <label className="form-label">Experience</label>
              <select
                className="form-select"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              >
                <option value="">Select Experience</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Yea">5 Year</option>
                <option value="6 Years">6 Years</option>
                <option value="7 Years">7 Years</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Fees</label>
              <input
                type="number"
                className="form-control"
                value={fees}
                onChange={(e) => setFees(e.target.value)}
                placeholder="Fees"
              />
            </div>

            <div className="col-12">
              <label className="form-label">About Doctor</label>
              <textarea
                className="form-control"
                rows="4"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Write about doctor"
              ></textarea>
            </div>

          </div>


          <div className="col-md-6">
            <label className="form-label">Address Line 1</label>
            <input
              type="text"
              className="form-control"
              value={address.line1}
              onChange={(e) =>
                setAddress({ ...address, line1: e.target.value })
              }
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Address Line 2</label>
            <input
              type="text"
              className="form-control"
              value={address.line2}
              onChange={(e) =>
                setAddress({ ...address, line2: e.target.value })
              }
            />
          </div>


          <button type="submit" className="btn btn-primary mt-4 px-4">
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;