import React, { useState } from 'react';
import './Update_Alternate_Flag.css'; // Import the CSS file
import upload from '../assets/file upload.png'
import Sidebarr from '../Sidebarr/Sidebarr'

import Navbar from '../Navbarr/Navbarr'



const ExcelFileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    // Handle uploading the selected file
    if (selectedFile) {
      // You can perform further processing with the selected file here
      console.log('Selected file:', selectedFile);
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <>
    <Navbar/>

    <div className='main'>

      <Sidebarr />

      <div className="excel-upload-container">

        <h2 className="excel-upload-header">Upload Excel File</h2>

        <div className="dotted-container">
          <div className="custom-file-input-container">
            <label htmlFor="file" className="custom-file-input-button">
              <img src={upload} alt="File Icon" className="file-icon" /> Choose File
            </label>
            <span className='spantext'>Supported File Extension is .xlsx</span>
            <input
              type="file"
              id="file"
              accept=".xls,.xlsx"
              className="excel-upload-input"
              onChange={handleFileChange}
            />
          </div>
          <button className="excel-upload-button" onClick={handleUpload}>Upload</button>
        </div>


        <div className='formatTable'>
          <h1>Note: Excel Spreadsheet Format</h1> <br />
          <p> Please find below the required format for uploading data into the system using an Excel spreadsheet. <br /> Kindly adhere to the following guidelines: </p>

          <div className='alternateTable'>
            <table>
              <thead>
                <tr>
                  <th>
                    column A (Material)
                  </th>
                  <th>
                    column B (Alternate Flags)
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Material Name</td>
                  <td>Value</td>
                </tr>
                
                <tr>
                  <td>Material Name</td>
                  <td>Value</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
    
    </>
    
  );
};

export default ExcelFileUpload;