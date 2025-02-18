import React, { useState, useEffect } from 'react';
import './Sidebarr.css';
import myImage from '../assets/home.png';
import myImage1 from '../assets/Usermanegment.png';
import myImage2 from '../assets/Admin.png';
import myImage3 from '../assets/imagemanegement.png';
import myImage4 from '../assets/Model.png';
import myImage5 from '../assets/updateimage.png';
import myImage6 from '../assets/Model.png';
import myImage7 from '../assets/imagehistory.png';
import myImage8 from '../assets/modelhistory.png';
import myImage9 from '../assets/imageupload.png';
import myImage10 from '../assets/log-out.png';

import { Link, useLocation } from 'react-router-dom';

import { BASE_URL } from '../config' ;

// Utility function to get cookie value by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return '';
};

//Utility function to get cookie value by access

// Utility function to get cookie value by name
const getCookie2 = (access) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${access}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return '';
};

export default function Sidebarr() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      // Retrieve session IDs from cookies
      const adminSessionId = getCookie('AdminSessionId');
      const userSessionId = getCookie('UserSessionId');

      // Prepare query parameters based on session IDs
      const sessionIdParams = [];
      
      if (adminSessionId) {
        sessionIdParams.push(`adminSessionId=${adminSessionId}`);
      }
      
      if (userSessionId) {
        sessionIdParams.push(`userSessionId=${userSessionId}`);
      }
      
      const queryString = sessionIdParams.join('&');
      
      // Send logout request to backend
      const response = await fetch(`${BASE_URL}logout.php?${queryString}`, {
        method: 'POST',
        credentials: 'include', // Send cookies
      });

      if (response.ok) {
        // Clear session cookies on the client side
        document.cookie = `AdminSessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `UserSessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

        // Redirect to login page using Link component
        // You can also handle this redirection using useHistory hook or withRouter HOC
      } else {
        throw new Error('Logout request failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Handle error if needed
    }
  };

  const handleClick = (path) => {
    setActiveItem(path);
  };

  const mainApp = {
    height: "41px",
    width: "100%", 
    color: "white", 
    backgroundColor: "rgba(0, 159, 137, 1)", 
    border: "rgba(0, 159, 137, 1)", 
    marginBottom: '15px',
  };

  const handleMainAppClick = () => {
    const sessionId = getCookie('AdminSessionId');
    if (sessionId) {
      console.log('Session ID:', sessionId);
      fetch(`${BASE_URL}/toggle.php`, {
        method: 'POST',
        body: JSON.stringify({ sessionId: sessionId }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        // Handle response if needed
      })
      .catch(error => {
        // Handle error if needed
      });
    }
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  return (
    <>
      <div className='sidebar_main'>

        <Link to="/Main_application/Main_application">
          <button type="button" className="btn-primary" style={mainApp} onClick={handleMainAppClick}>
            Main Application
          </button>
        </Link>

        <div className="sidebar">
          <ul>
            <Link to="/Homepage/Homecontainetr">
              <li className={activeItem === '/Homepage/Homecontainetr' ? 'active' : ''} onClick={() => handleClick('/Homepage/Homecontainetr')}>
                <div className="logo-image flex flex-row gap-2">
                  <div>
                    <img src={myImage} alt="Home" className="Home-logo" />
                  </div>
                  <h4>Home</h4>
                </div>
              </li>
            </Link>

            <Link to="/User_management/User_management">
              <li className={activeItem === '/User_management/User_management' ? 'active' : ''} onClick={() => handleClick('/User_management/User_management')}>
                <div className="logo-image flex flex-row gap-2">
                  <div>
                    <img src={myImage1} alt="User Management" className="finder-logo" />
                  </div>
                  <h4>User Management</h4> 
                </div>
              </li>
            </Link>

            <Link to="/Admin_manegement/Admin_manegement">
              <li className={activeItem === '/Admin_manegement/Admin_manegement' ? 'active' : ''} onClick={() => handleClick('/Admin_manegement/Admin_manegement')}>
                <div className="logo-image flex flex-row gap-2">
                  <div>
                    <img src={myImage2} alt="Admin Management" className="admin-logo" />
                  </div>
                  <h4> Admin Management</h4>
                </div>
              </li>
            </Link>

            {/* Uncomment and update the paths as needed */}
            {/* <Link to="/imagheupdate">
              <li className={activeItem === '/imagheupdate' ? 'active' : ''} onClick={() => handleClick('/imagheupdate')}>
                <div className="logo-image flex flex-row gap-2">
                  <div>
                    <img src={myImage3} alt="Image Management" className="image-logo" />
                  </div>
                    <h4>Image Management</h4>
                </div>
              </li>
            </Link> */}

            {/* Repeat for other links */}

            <Link to="/Updateflagimage">
              <li className={activeItem === '/Updateflagimage' ? 'active' : ''} onClick={() => handleClick('/Updateflagimage')}>
                <div className="logo-image flex flex-row gap-2">
                  <div>
                    <img src={myImage9} alt="Update Alternate Flag" className="finder-logo" />
                  </div>
                    <h4>Update Alternate Flag</h4>
                </div>
              </li>
            </Link>
          </ul>
          <div className="logout-btn-container flex flex-row gap-2">
            <div>
              <img src={myImage10} alt="Logout" className="logout-logo" />
            </div>
            <div>
            <Link to="/login" onClick={handleLogout} className='flex flex-row me-2'>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
