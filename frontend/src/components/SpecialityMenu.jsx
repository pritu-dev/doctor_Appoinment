import React from 'react';
import { specialityData } from "../assets/assets.js";
import { useNavigate} from 'react-router-dom';


const SpecialityMenu = () => {
const navigate = useNavigate();

    return (
        <div>
            <div className='text-center mt-5 p-5'>
                <h2>Find by Speciality</h2>
                <p>Simply browse through our extensive list of <br />trusted doctors, schedule your appointment hassle-free.</p>
            </div>

            <div className='d-flex justify-content-center gap-4 mb-5'>
                {
                    specialityData.map((item, index) => {
                        return (
                            <div onClick={() => navigate(`/doctors/${item.speciality}`)}>
                                <img src={item.image} alt="" />
                                <p className='text-center'>{item.speciality}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default SpecialityMenu;
