import React from 'react';
import { useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from '../../assets/assets';

const DoctorProfile = () => {
    const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext);
    const [isEdit, setIsEdit] = useState(false);

    const updateProfile = async () => {
        try {
            const { data } = await axios.post(backendUrl + "/api/doctor/update-profile", { profileData }, { headers: { dToken } });
            if (data.success) {
                getProfileData(); // refresh data
                toast.success(data.message);
                setIsEdit(prev => !prev);
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error){
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (dToken) {
            getProfileData();
        }
    }, [dToken]);

return profileData && (
  <div className="container">
    <div className="mb-3">

      <div className="row w-50">

        {/* Doctor Image */}
        <div className="mb-3">
          <img
            src={assets.patients_icon}
            alt="doctor"
            className="img-fluid rounded-circle border"
            style={{ width: "130px", height: "130px", objectFit: "cover" }}
          />
        </div>

        {/* Doctor Info */}
        <div className="">

          <h3>{profileData.name}</h3>

          <p className="text-secondary">
            {profileData.education}

            <span className="ms-2">
              - {profileData.speciality}
            </span>

            <span className="badge bg-light text-dark ms-3 border rounded-3">
              {profileData.experience}
            </span>
          </p>

          {/* About */}
          <h6>
            About :
            <span className="text-secondary ms-2">
              {profileData.about}
            </span>
          </h6>

          {/* Fees */}
          <div className="mt-3">

            {isEdit ? (
              <input
                type="number"
                className="form-control w-25"
                value={profileData.fees}
                onChange={(e) =>
                  setProfileData(prev => ({
                    ...prev,
                    fees: e.target.value
                  }))
                }
              />
            ) : (
              <h6>
                Appointment Fees :
                <span className="text-secondary ms-2">
                  <b>$</b> {profileData.fees}
                </span>
              </h6>
            )}

          </div>

          {/* Availability */}
          <div className="form-check mt-3">

            {isEdit ? (
              <>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={profileData.available}
                  onChange={() =>
                    setProfileData(prev => ({
                      ...prev,
                      available: !prev.available
                    }))
                  }
                />

                <label className="form-check-label">
                  Available
                </label>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={profileData.available}
                  readOnly
                />

                <label className="form-check-label">
                  Available
                </label>
              </>
            )}

          </div>

          {/* Buttons */}
          <div className="mt-4">

            {isEdit ? (
              <button
                onClick={updateProfile}
                className="btn btn-success"
              >
                Save Information
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(!isEdit)}
                className="btn btn-outline-primary rounded-pill px-4"
              >
                Edit
              </button>
            )}

          </div>

        </div>
      </div>
    </div>
  </div>
);
}

export default DoctorProfile;
