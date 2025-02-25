import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import NavStyles from "./Navbar.module.css";
import suzlon_logo from "../assets/suzlon_logo.svg";
import myImage_1 from "../assets/SAP CODE FINDER 1.png";
import logout from "../assets/log-out-nav.png";
import Pending_Image from "../Dropdown/Pending_Image/Pending_Image";
import Pending_Model from "../Dropdown/Pending_Model/Pending_Model";
import Update_image_sec from "../Dropdown/Update_image_sec/Update_image_sec";
import Update_model_sec from "../Dropdown/Update_model_sec/Update_model_sec";
import { BASE_URL } from "../config";

// Utility function to get cookie value by name
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return "";
};

const Navbar = () => {
  const [urlname, setUrlname] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalw, setShowModalw] = useState(false);
  const [showModalsec, setShowModalsec] = useState(false);
  const [showModalmodel, setShowModalmodel] = useState(false);
  const [userName, setUserName] = useState("User Name"); // Default fallback
  const location = useLocation();

  // Extract the first letter of the first name
  const getFirstNameInitial = (name) => {
    if (!name) return "U"; // Fallback initial if name is missing
    const nameArray = name.split(" ");
    return nameArray[0].charAt(0).toUpperCase();
  };

  useEffect(() => {
    // Update URL name
    let url = location.pathname.split("/mainapplication")[1];
    setUrlname(url);

    // Fetch userName from cookies
    const storedUserName = getCookie("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, [location]);

  const handleLogout = async () => {
    try {
      const adminSessionId = getCookie("AdminSessionId");
      const userSessionId = getCookie("UserSessionId");

      const sessionIdParams = [];
      if (adminSessionId) {
        sessionIdParams.push(`adminSessionId=${adminSessionId}`);
      }
      if (userSessionId) {
        sessionIdParams.push(`userSessionId=${userSessionId}`);
      }

      const queryString = sessionIdParams.join("&");

      const response = await fetch(`${BASE_URL}/logout.php?${queryString}`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        // Clear cookies
        document.cookie = `AdminSessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `UserSessionId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

        // Clear local storage
        localStorage.clear();
      } else {
        throw new Error("Logout request failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className={NavStyles.navbar}>
      <div className={NavStyles.navSec1}>
        <img src={suzlon_logo} alt="Suzlon Logo" className={NavStyles.navbarLogo} />
        <div className={NavStyles.separator}></div>
        <h1 className={NavStyles.logo_nav}>
          <img src={myImage_1} alt="SAP Logo" />
          Sap Code Finder
        </h1>
      </div>

      <div className={NavStyles.navSec2}>
        <div className={NavStyles.dropdown}>
          <div className={NavStyles.profileI}>{getFirstNameInitial(userName)}</div>
          <div className={NavStyles.dropdown_content}>
            <Link to="#">{userName}</Link>
            <Link to="/login" className={NavStyles.logoutA} onClick={handleLogout}>
              <img src={logout} alt="Logout" /> Logout
            </Link>
          </div>
        </div>
      </div>

      <Pending_Image show={showModal} handleClose={() => setShowModal(false)} />
      <Pending_Model show={showModalw} handleClose={() => setShowModalw(false)} />
      <Update_image_sec show={showModalsec} handleClose={() => setShowModalsec(false)} />
      <Update_model_sec show={showModalmodel} handleClose={() => setShowModalmodel(false)} />
    </div>
  );
};

export default Navbar;
