import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import NavStyles from './Navbar.module.css'
// import "../App.css";
import suzlon_logo from '../assets/suzlon_logo.svg';
import myImage_1 from '../assets/SAP CODE FINDER 1.png';
import dropdown from '../assets/dropdown icon.png';
import Profile from '../assets/Profile.svg';

import logout from '../assets/log-out-nav.png';
import Pending_Image from '../Dropdown/Pending_Image/Pending_Image';  // Import the modal component
import Pending_Model from '../Dropdown/Pending_Model/Pending_Model';
import Update_image_sec from '../Dropdown/Update_image_sec/Update_image_sec';
import Update_model_sec from '../Dropdown/Update_model_sec/Update_model_sec';

import { BASE_URL, IMAGE_BASE_URL, } from '../config';


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

  // const ProfileI = "Pratik Patil";

   const ProfileI = "{userName}";

  const getFirstNameInitial = (name) => {
    const nameArray = name.split(" ");
    return nameArray[0].charAt(0);
  };

  const firstNameInitial = getFirstNameInitial(ProfileI).toUpperCase();

  // console.log(firstNameInitial);



  const [urlname, setUrlname] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalw, setShowModalw] = useState(false);
  const [showModalsec, setShowModalsec] = useState(false);
  const [showModalmodel, setShowModalmodel] = useState(false);
  // const [userName, setUserName] = useState('Pratik Patil'); // Default name

  const [access, setaccesss] = useState('User'); // Default access
  const location = useLocation();

  const userName = localStorage.getItem('user-name')

  useEffect(() => {
    // Get the first part of the pathname
    let url = location.pathname.split("/mainapplication")[1];
    setUrlname(url);

    // Get the user name from the cookie
    // const nameFromCookie = getCookie('userName2');
    // if (nameFromCookie) {
    //     setUserName(nameFromCookie);
    // }

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

  // const handleAutoLogin = async () => {
  //     // Retrieve domain_id from the cookie
  //     const domain_id = document.cookie
  //       .split('; ')
  //       .find(row => row.startsWith('domainId='))
  //       ?.split('=')[1];

  //     // Base64 encode the domain_id
  //     const encodedDomainId = btoa(domain_id);

  //     // Log the encoded domain_id being sent
  //     console.log('Sending encoded domain_id:', encodedDomainId);

  //     try {
  //       const response = await fetch('http://localhost:8092/api_for_auto_login.php', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/x-www-form-urlencoded'
  //         },
  //         body: `action=auto_login&domain_id=${encodedDomainId}`
  //       });

  //       if (response.ok) {
  //         const responseData = await response.json();

  //         // Handle successful auto-login
  //         console.log('Auto-login successful');

  //         // Retrieve the required fields from the response
  //         const empCode = responseData.data.empCode;
  //         const userName = responseData.data.userName;
  //         const emailId = responseData.data.emailId;

  //         // Log the retrieved fields
  //         console.log('Employee Code:', empCode);
  //         console.log('User Name:', userName);
  //         console.log('Email ID:', emailId);

  //         // Store them in variables or use them as needed
  //         // (for example, you could set these in the application state if using React)
  //         // setState({ empCode, userName, emailId });

  //         // Redirect to wtg_planning_user.js
  // //   window.location.href = '../users/wtg-planning-user';

  //       } else {
  //         // Handle errors if the response is not ok
  //         console.error('Auto-login failed', response.statusText);
  //       }
  //     } catch (error) {
  //       // Handle any other errors
  //       console.error('An error occurred during auto-login', error);
  //     }
  //   };

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

      localStorage.clear();

      if (response.ok) {
        // Clear session cookies on the client side
        document.cookie = `AdminSessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `UserSessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        localStorage.clear();

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
    <div className={NavStyles.navbar}>

      <div className={NavStyles.navSec1}>
        {/* <img src={`${IMAGE_BASE_URL}/${myImage}`} alt="My Image" className="navbar-logo suz-logo" /> */}
        <img src={` ${suzlon_logo} `} alt="suzlon_logo" className={NavStyles.navbarLogo} />
        <div className={NavStyles.separator}></div>
        <h1 className={NavStyles.logo_nav} >
          <img src={myImage_1} alt="SAP LOGO" />
          Sap Code Finder
        </h1>
      </div>

      {/* kUNAL */}
      {/* Assuming dropdownItems.items is an array of objects like { href, text } */}
      <div className={NavStyles.navSec2}>

        <div className={NavStyles.dropdown}>

          <div className={NavStyles.profileI} >{firstNameInitial}</div>
          <div className={NavStyles.dropdown_content}>

            <Link to="#" >{ProfileI}</Link>

            <Link to="/login" className={NavStyles.logoutA} onClick={handleLogout} >
              <img src={logout} alt="Logout" /> Logout
            </Link>
          </div>
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
