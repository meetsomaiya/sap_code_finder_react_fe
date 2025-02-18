import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import NavStyles from './Navbar.module.css';
import suzlon_logo from '../assets/suzlon_logo.svg';
import myImage_1 from '../assets/SAP CODE FINDER 1.png';
import logout from '../assets/log-out-nav.png';
import Pending_Image from '../Dropdown/Pending_Image/Pending_Image'; 
import Pending_Model from '../Dropdown/Pending_Model/Pending_Model';
import Update_image_sec from '../Dropdown/Update_image_sec/Update_image_sec';
import Update_model_sec from '../Dropdown/Update_model_sec/Update_model_sec';
import { BASE_URL } from '../config';

// Utility function to get cookie value by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return '';
};

// Utility function to get cookie value by access
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
  const [access, setAccess] = useState('User'); 
  const location = useLocation();

  const userName = localStorage.getItem('user-name') || "User Name";

  const getFirstNameInitial = (name) => {
    const nameArray = name.split(" ");
    return nameArray[0].charAt(0);
  };

  const firstNameInitial = getFirstNameInitial(userName).toUpperCase();

  useEffect(() => {
    let url = location.pathname.split("/mainapplication")[1];
    setUrlname(url);

    const accessFromCookie = getCookie2('access');
    if (accessFromCookie) {
      setAccess(accessFromCookie);
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

  const handleLogout = async () => {
    try {
      const adminSessionId = getCookie('AdminSessionId');
      const userSessionId = getCookie('UserSessionId');

      const sessionIdParams = [];
      if (adminSessionId) {
        sessionIdParams.push(`adminSessionId=${adminSessionId}`);
      }
      if (userSessionId) {
        sessionIdParams.push(`userSessionId=${userSessionId}`);
      }

      const queryString = sessionIdParams.join('&');

      const response = await fetch(`${BASE_URL}/logout.php?${queryString}`, {
        method: 'POST',
        credentials: 'include', 
      });

      localStorage.clear();

      if (response.ok) {
        document.cookie = `AdminSessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `UserSessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        localStorage.clear();
      } else {
        throw new Error('Logout request failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className={NavStyles.navbar}>
      <div className={NavStyles.navSec1}>
        <img src={suzlon_logo} alt="suzlon_logo" className={NavStyles.navbarLogo} />
        <div className={NavStyles.separator}></div>
        <h1 className={NavStyles.logo_nav}>
          <img src={myImage_1} alt="SAP LOGO" />
          Sap Code Finder
        </h1>
      </div>

      <div className={NavStyles.navSec2}>
        <div className={NavStyles.dropdown}>
          <div className={NavStyles.profileI}>{firstNameInitial}</div>
          <div className={NavStyles.dropdown_content}>
            <Link to="#">{userName}</Link>
            <Link to="/login" className={NavStyles.logoutA} onClick={handleLogout}>
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
