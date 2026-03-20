import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
    return (
        //         <div >
        //             <h2>CONTACT US</h2>
        //  <div className='d-flex'>
        //             <div>
        //                 <img src={assets.contact_image} alt="" />
        //             </div>
        //             <div>
        //                 <h4>OUR OFFICE</h4>
        //                 <p>00000 Willms Station
        //                     Suite 000, Washington, USA</p>

        //                 <p>Tel: (000) 000-0000
        //                     Email: greatstackdev@gmail.com</p>

        //                     <h4>CAREERS AT PRESCRIPTO</h4>
        //                     <p>Learn more about our teams and job openings.</p>

        //                     <button>Explore Jobs</button>
        //             </div>
        //         </div>
        //         </div>

        // <div className='container'> 
        //      <div className="row">

        //      </div>
        // </div>

        <div className="container">
            <div className="row">
                <h3 className="text-center mt-3" style={{ color: "#707070" }}>
                    Contact <span className='text-dark'>US</span>
                </h3>

                <div className="col-6">
                    <img className="w-75 p-5 ms-5" src={assets.contact_image} alt="" />
                </div>

                <div className="col-6 p-5">
                    <p>00000 Willms Stationbr <br />Suite 000, Washington, USA</p>
                    <p>Tel: (000) 000-0000
                        <br /> Email: joshipriti954@gmail.com</p>

                    <h5>CAREERS AT PRESCRIPTO</h5>
                    <p>Learn more about our teams and job openings.</p>

                    <button className='border-0m p-3 border-1'>Explore Jobs</button>
                </div>
            </div>
        </div>
    );
}

export default Contact;
