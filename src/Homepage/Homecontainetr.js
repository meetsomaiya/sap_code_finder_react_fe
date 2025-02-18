import React, { useEffect, useState } from 'react';
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

import { BASE_URL } from '../config' ;

export default function Homecontainer() {
  const [userCount, setUserCount] = useState(null);
  const [error, setError] = useState(null);

  const [totalUserCount, setTotalUserCount] = useState(null);
  const [error2, setError2] = useState(null);

  const [adminCount, setAdminCount] = useState(null);
  const [error3, setError3] = useState(null);

  const [data3, setData3] = useState(null);
  const [error6, setError6] = useState(null);

  useEffect(() => {
    const fetchActiveUserCount = async () => {
      try {
        const response = await fetch(`${BASE_URL}fetch_active_user_count.php`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUserCount(data.count);
      } catch (error) {
        console.error('Error fetching active user count:', error);
        setError('Error loading count');
      }
    };

    fetchActiveUserCount();
  }, []);

  useEffect(() => {
    const fetchTotalUserCount = async () => {
      try {
        const response = await fetch(`${BASE_URL}fetch_total_user_count.php`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTotalUserCount(data.count);
      } catch (error) {
        console.error('Error fetching total user count:', error);
        setError2('Error loading count');
      }
    };

    fetchTotalUserCount();
  }, []);

  useEffect(() => {
    const fetchActiveAdminCount = async () => {
      try {
        const response = await fetch(`${BASE_URL}fetch_active_admin_count.php`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAdminCount(data.count);
      } catch (error) {
        console.error('Error fetching active admin count:', error);
        setError3('Error loading count');
      }
    };

    fetchActiveAdminCount();
  }, []);

  useEffect(() => {
    const fetchTotalAdminCount = async () => {
      try {
        const response = await fetch(`${BASE_URL}fetch_total_admin_count.php`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData3(data.count);
      } catch (error) {
        console.error('Error fetching total admin count:', error);
        setError6('Error loading count');
      }
    };

    fetchTotalAdminCount();
  }, []);

  
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
      <h2>{error ? error : userCount !== null ? userCount : 'Loading...'}</h2>
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
      <h2>{error2 ? error2 : totalUserCount !== null ? totalUserCount : 'Loading...'}</h2>
    </div>
            <div>
              <Link to="/User_management/User_management">
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
      <h2>{error3 ? error3 : adminCount !== null ? adminCount : 'Loading...'}</h2>
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
      <h2>{error6 ? error6 : data3 !== null ? data3 : 'Loading...'}</h2>
    </div>
            <div>
              <a href="/Admin_manegement/Admin_manegement">
                <img src={blue} alt="My Image" className="blue_icon" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </>

  );
}
