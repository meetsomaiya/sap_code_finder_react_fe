import React from 'react';
import './Homecontainert.css';
import myImage1 from '../assets/red.png'
import myImage2 from '../assets/green.png'
import myImage3 from '../assets/violate.png'
import myImage4 from '../assets/blue.png'
import orange from '../assets/red arrow.png'
import green from '../assets/green arrow.png'
import violet from '../assets/violate arrow.png'
import blue from '../assets/blue arrow.png'
import { Link } from 'react-router-dom';
import Sidebarr from '../Sidebarr/Sidebarr'

import Navbar from '../Navbarr/Navbarr'

export default function Homecontainer() {
  return (
    <>
    <Navbar/>
      <div className='main'>
         
        <Sidebarr />


        <div className="grid-container ">

          <div className="card1 flex flex-row">
            <div>
              <img src={myImage1} alt="My Image" className="text-logo red-logo" />
            </div>

            <p className="active-user">Active User</p>

            <div className='Activenumber'>
              <h2>476</h2>
            </div>

            <div>
              <Link to="/Activeuser">
                <img src={orange} alt="My Image" className="red_icon" />
              </Link>
            </div>

          </div>





          <div className="card2 flex flex-row">
            <div>
              <img src={myImage2} alt="My Image" className="text-logo green-logo" />
            </div>
            <p className="active-user1">Total User</p>
            <div className='Activenumber1'>
              <h2>481</h2>
            </div>
            <div>
              <Link to="/user">
                <img src={green} alt="My Image" className="green_icon" />
              </Link>
            </div>
          </div>





          <div className="card3 flex flex-row">
            <div>
              <img src={myImage3} alt="My Image" className="text-logo violet-logo" />
            </div>
            <p className="active-user2">Active Admin</p>
            <div className='Activenumber2'>
              <h2>3</h2>
            </div>
            <div>
              <a href="/Activeadmin">
                <img src={violet} alt="My Image" className="violet_icon" />
              </a>
            </div>
          </div>



          <div className="card4 flex flex-row">
            <div>
              <img src={myImage4} alt="My Image" className="text-logo blue-logo" />
            </div>
            <p className="active-user3">Total Admin</p>
            <div className='Activenumber3'>
              <h2>5</h2>
            </div>
            <div>
              <a href="/admin">
                <img src={blue} alt="My Image" className="blue_icon" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </>

  );
}
