import React, { useState } from 'react';
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

export default function Sidebarr() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const handleClick = (path) => {
    setActiveItem(path);
  };

  const mainApp ={height: "41px",
                   width: "100%", 
                   color: "white", 
                   backgroundColor: "rgba(0, 159, 137, 1)", 
                   border: "rgba(0, 159, 137, 1)", 
                   marginBottom:'15px',
                  
                  }

  return (
    <>
      <div className='sidebar_main'>

        <Link to="/Main_application/Main_application">
          <button type="button" className="btn-primary " style={mainApp} >
            Main Application
          </button>
        </Link>

        <div className="sidebar">
          <ul>

          <Link to="/">
            <li className={activeItem === '/' ? 'active' : ''} onClick={() => handleClick('/')}>
              <div className="logo-image flex flex-row gap-2">
                <div>
                  <img src={myImage} alt="Home" className="Home-logo" />
                </div>
               <h4>Home</h4>
              </div>
            </li>
            </Link>


            <Link to="/user">
            <li className={activeItem === '/user' ? 'active' : ''} onClick={() => handleClick('/user')}>
              <div className="logo-image flex flex-row gap-2">
                <div>
                  <img src={myImage1} alt="User Management" className="finder-logo" />
                </div>
                <h4>User Management</h4> 
              </div>
            </li>
            </Link>

            <Link to="/admin">
            <li className={activeItem === '/admin' ? 'active' : ''} onClick={() => handleClick('/admin')}>
              <div className="logo-image flex flex-row gap-2">
                <div>
                  <img src={myImage2} alt="Admin Management" className="admin-logo" />
                </div>
               <h4> Admin Management</h4>
              </div>
            </li>
            </Link>


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


            {/* <Link to="/model">
            <li className={activeItem === '/model' ? 'active' : ''} onClick={() => handleClick('/model')}>
              <div className="logo-image flex flex-row gap-2">
                <div>
                  <img src={myImage4} alt="Model Management" className="finder-logo" />
                </div>
                 <h4>Model Management</h4>
              </div>
            </li>
            </Link> */}


            {/* <Link to="/Updateimage">
            <li className={activeItem === '/Updateimage' ? 'active' : ''} onClick={() => handleClick('/Updateimage')}>
              <div className="logo-image flex flex-row gap-2">
                <div>
                  <img src={myImage5} alt="Update Image" className="finder-logo" />
                </div>
                <h4>Update Image</h4>
              </div>
            </li>
            </Link> */}


            {/* <Link to="/modelupdate">
            <li className={activeItem === '/modelupdate' ? 'active' : ''} onClick={() => handleClick('/modelupdate')}>
              <div className="logo-image flex flex-row gap-2">
                <div>
                  <img src={myImage6} alt="Update Model" className="finder-logo" />
                </div>
                <h4> Update Model</h4>
              </div>
            </li>
            </Link> */}



            {/* <Link to="/imagehistory">
            <li className={activeItem === '/imagehistory' ? 'active' : ''} onClick={() => handleClick('/imagehistory')}>
              <div className="logo-image flex flex-row gap-2">
                <div>
                  <img src={myImage7} alt="Image Update History" className="finder-logo" />
                </div>
                  <h4>Image Update History</h4>
              </div>
            </li>
            </Link> */}

            {/* <Link to="/modelhistory">
            <li className={activeItem === '/modelhistory' ? 'active' : ''} onClick={() => handleClick('/modelhistory')}>
              <div className="logo-image flex flex-row gap-2">
                <div>
                  <img src={myImage8} alt="Model Update History" className="finder-logo" />
                </div>
                    <h4>Model Update History</h4>
              </div>
            </li>
            </Link> */}



            <Link to="/Updateflagimage">
            <li className={activeItem === '/Updateflagimage' ? 'active' : ''} onClick={() => handleClick('/Updateflagimage')}>
              <div className="logo-image flex flex-row gap-2">
                <div>
                  <img src={myImage9} alt="Update Alternate Flag" className="finder-logo" />
                </div>
                  <h4>  Update Alternate Flag</h4>
              </div>
            </li>
            </Link>



          </ul>
          <div className="logout-btn-container flex flex-row gap-2">
            <div>
              <img src={myImage10} alt="Logout" className="logout-logo" />
            </div>
            <div>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
