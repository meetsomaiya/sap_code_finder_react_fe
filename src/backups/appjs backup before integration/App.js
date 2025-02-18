import React from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Navbarr from './Navbarr/Navbarr';
// import Sidebarr from './Sidebarr/Sidebarr';
import Homepage from './Homepage/Homecontainetr';
import User_manegement from './User_management/User_management';
import Admin_manegement from './Admin_manegement/Admin_manegement';
import Activeuser_Manegement from './Activeuser manegement/Activeuser_manegement';
import Activeadmin from './Activeadmin/Activeadmin'; 
import Model_manegement from './Model_manegement/Model_manegement';
import Update_image from './Update_image/Update_image';
import Update_Alternate_Flag from './Update_Alternate_Flag/Update_Alternate_Flag';
import Main_application from './Main_application/Main_application';
import Image_Update_History from './Image_Update_History/Image_Update_History';
import Model_Update_History from './Model_Update_History/Model_Update_History';
import Update_model from './Update_model/Update_model';
import Image_Manegement from './Image_Manegement/Image_Manegement';

// import Pending_Image from './Dropdown/Pending_Image/Pending_Image';
// import Pending_model from './Dropdown/Pending_Model/Pending_Model';
// import Update_image_sec from './Dropdown/Update_image_sec/Update_image_sec';
// import Update_model_sec from './Dropdown/Update_model_sec/Update_model_sec';


import 'tailwindcss/tailwind.css'; 

function App() {
  return (
    <>
      <BrowserRouter>
    
          <Navbarr />
          
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/user" element={<User_manegement />} />
                <Route path="/admin" element={<Admin_manegement />} />
                <Route path="/Activeuser" element={<Activeuser_Manegement />} />
                <Route path="/model" element={<Model_manegement />} />
                <Route path="/Updateimage" element={<Update_image />} />
                <Route path="/Updateflagimage" element={<Update_Alternate_Flag />} />
                <Route path="/mainapplication" element={<Main_application />} />
                <Route path="/imagehistory" element={<Image_Update_History />} />
                <Route path="/modelhistory" element={<Model_Update_History />} />
                <Route path="/modelupdate" element={<Update_model />} />
                <Route path="/imagheupdate" element={<Image_Manegement />} />
                <Route path="/Activeadmin" element={<Activeadmin />} />
               
              </Routes>
      
    
          
       
      </BrowserRouter>
    </>
  );
}

export default App;
