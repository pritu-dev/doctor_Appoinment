import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
    return (
        <div className='container mt-5 p-5'>
                <div className='d-flex justify-content-around'>
                  <div >
                    <img src={assets.logo} alt="" />
                    <p>Lorem Ipsum is simply dummy text of the printing and <br />
                    typesetting industry. Lorem Ipsum has been the <br />
                    industry's standard dummy text ever since the 1500s, <br />
                    when an unknown printer took a galley of type and <br />
                    scrambled it to make a type specimen book. <br />
                    </p>
                </div>

                <div className="box-2 d-flex gap-5">
                    <div >
                    <h5>COMPANY</h5>
                    <p>Home</p>
                    <p>About us</p>
                    <p>Delivery</p>
                    <p>Privacy policy</p>
                </div>
                <div >
                    <h5>GET IN TOUCH</h5>
                    <p>+0-000-000-000</p>
                    <p>pritijoshi@gmail.com</p>
                </div>
             </div>
            </div>
          <hr />
          <p className='text-center'>Copyright 2024 @ Greatstack.dev - All Right Reserved.</p>
        </div>
    );
}

export default Footer;
