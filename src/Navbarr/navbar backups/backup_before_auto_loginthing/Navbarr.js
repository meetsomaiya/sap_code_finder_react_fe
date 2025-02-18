import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Navbarr.css';
import "../App.css";
import myImage from '../assets/image.png';
import myImage_1 from '../assets/SAP CODE FINDER 1.png';
import dropdown from '../assets/dropdown icon.png';
import logout from '../assets/log-out-nav.png';
import Pending_Image from '../Dropdown/Pending_Image/Pending_Image';  // Import the modal component
import Pending_Model from '../Dropdown/Pending_Model/Pending_Model';
import Update_image_sec from '../Dropdown/Update_image_sec/Update_image_sec';
import Update_model_sec from '../Dropdown/Update_model_sec/Update_model_sec';

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

const Navbar = () => {
    const [urlname, setUrlname] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showModalw, setShowModalw] = useState(false);
    const [showModalsec, setShowModalsec] = useState(false);
    const [showModalmodel, setShowModalmodel] = useState(false);
    const [userName, setUserName] = useState('Pratik Patil'); // Default name

    const [access, setaccesss] = useState('User'); // Default access
    const location = useLocation();

    useEffect(() => {
        // Get the first part of the pathname
        let url = location.pathname.split("/mainapplication")[1];
        setUrlname(url);

        // Get the user name from the cookie
        const nameFromCookie = getCookie('name');
        if (nameFromCookie) {
            setUserName(nameFromCookie);
        }

                // Get the user name from the cookie
                const accessFromCookie = getCookie2('access');
                if (accessFromCookie) {
                    setaccesss(accessFromCookie);
                }
    }, [location]);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleShoww = () => setShowModalw(true);
    const handleClosew = () => setShowModalw(false);

    const handleShowsec = () => setShowModalsec(true);
    const handleClosesec = () => setShowModalsec(false);

    const handleShowmodel = () => setShowModalmodel(true);
    const handleClosemodel = () => setShowModalmodel(false);

    console.log(urlname);


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
          const response = await fetch(`${BASE_URL}/logout.php?${queryString}`, {
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
    

    
    return (
        <div className="navbar">
            <div className='flex'>
                <a className="navbar-brand" href="#">
                    <img src={myImage} alt="My Image" className="navbar-logo suz-logo" />
                </a>
            </div>
            <div className="separator"></div>
            <div className='flex flex-auto left-0'>
                <div className="logo_nav flex flex-row gap-2">
                    <div className="logo-image">
                        <img src={myImage_1} alt="My Image" className="sap-finder-logo" />
                    </div>
                    <div><p>Sap Code Finder</p></div>
                </div>
            </div>
            <div className='dropdown-container'>
                <div className="nav-item dropdown">
                    <a role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <div className='flex flex-row'>
                                <div className="user-info">
                                    <p className="user-name">{userName}</p>
                                    <p className="user-designation">{access}</p>
                                </div>
                            <div className='mt-3'>
                                <img src={dropdown} alt="Dropdown Icon" style={{ width: '12px', height: '6px' }} />
                            </div>
                        </div>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <div className="separator-horizontal"></div>
                        <a className="dropdown-item" href="#">
                        <Link to="/login" onClick={handleLogout} className='flex flex-row me-2'>
      <img src={logout} alt="Logout" className="logout-icon mr-2" />  Logout
    </Link>
                        </a>
                    </ul>
                </div>
            </div>
            <Pending_Image show={showModal} handleClose={handleClose} />
            <Pending_Model show={showModalw} handleClose={handleClosew} />
            <Update_image_sec show={showModalsec} handleClose={handleClosesec} />
            <Update_model_sec show={showModalmodel} handleClose={handleClosemodel} />
        </div>
    );
}

export default Navbar;
