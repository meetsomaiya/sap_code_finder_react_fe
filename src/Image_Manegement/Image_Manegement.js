import React, { useState, useEffect } from 'react';
import './Image_Manegement.css';
import MaterialImage from "../assets/images 2.png";
import ZoomIcon from "../assets/Zoom_a.png";  // Ensure this path is correct
import Sidebarr from '../Sidebarr/Sidebarr';

function Image_Manegement() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [zoomedImage, setZoomedImage] = useState(null);

    // Sample default data
    const defaultData = [
        {
            id: 1,
            name: "pratik patil pratik patil",
            domainId: 123,
            materialCode: "123445",
            materialDescription: "FREQ CONV PM2-D35.1WVA02 181-00841 MOOG",
            MaterialImage: `${MaterialImage}`
        },
        {
            id: 2,
            name: "pratik",
            domainId: 123,
            materialCode: "123445",
            materialDescription: "FREQ CONV PM2-D35.1WVA02 181-00841 MOOG",
            MaterialImage: `${MaterialImage}`
        },
        {
            id: 3,
            name: "pratik",
            domainId: 12378654,
            materialCode: "123445",
            materialDescription: "FREQ CONV PM2-D35.1WVA02 181-00870",
            MaterialImage: `${MaterialImage}`
        },
    ];

    // Function to filter data based on search query
    const filterData = (query) => {
        return defaultData.filter(item =>
            item.domainId.toString().includes(query) ||
            item.materialDescription.toLowerCase().includes(query.toLowerCase())
        );
    };

    // Handle search input change
    const handleInputChange = (e) => {
        const { value } = e.target;
        setSearchQuery(value);
    };

    // Function to handle search
    const handleSearch = () => {
        const newData = filterData(searchQuery);
        setFilteredData(newData);
    };

    // Function to handle zoom
    const handleZoom = (image) => {
        setZoomedImage(image);
    };

    // Function to close zoom modal
    const closeZoom = () => {
        setZoomedImage(null);
    };

    // Function to handle file upload
    const handleFileUpload = (e, id) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
            // Update the image in your data (you might want to update it in your state or make an API call)
            console.log("File uploaded successfully:", file);
        } else {
            alert("Please upload a valid JPEG or JPG image.");
        }
    };

    useEffect(() => {
        setFilteredData(defaultData);
    }, []);

    return (
        <div className='main'>
          
                <Sidebarr />
        
            <div className='imageMamagementMain'>

         
                    <div className="search-bar-imagem">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleInputChange}
                            placeholder="Search by Domain ID and Material Description"
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
          


                    <div className="image-table-container">
                        <table className="Image-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Domain ID</th>
                                    <th>Material Code</th>
                                    <th className='image_manegement'>Material Description</th>
                                    <th>Material Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.domainId}</td>
                                        <td>
                                            <div className='material_image'>
                                                <div className='image_material'>
                                                    <span>{item.materialCode}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item.materialDescription}</td>
                                        <td>
                                            <div className='image-manegement'>
                                                <img src={item.MaterialImage ? item.MaterialImage : "../assets/noimage.jpg"} alt="Previous Material" className='image_size' />
                                                <div className='zoom-icon-container' onClick={() => handleZoom(item.MaterialImage)}>
                                                    <img src={ZoomIcon} alt="Zoom Icon" className='zoom-icon' />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='flex flex-row'>
                                                <button className="update-btn-model" onClick={() => handleUpdate(item.id)}>Update</button>
                                                <button className="reject-btn_model" onClick={() => handleReject(item.id)}>Reject</button>
                                                <input
                                                    type="file"
                                                    accept="image/jpeg, image/jpg"
                                                    onChange={(e) => handleFileUpload(e, item.id)}
                                                    style={{ display: 'none' }}
                                                    id={`file-upload-${item.id}`}
                                                />
                                                {/* <label htmlFor={`file-upload-${item.id}`} className="upload-btn-model">
                                            
                                                </label> */}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
         


                {zoomedImage && (
                    <div className='zoom-modal' onClick={closeZoom}>
                        <div className='zoom-modal-content'>
                            <span className='close' onClick={closeZoom}>&times;</span>
                            <img src={zoomedImage} alt="Zoomed Material" className='zoomed-image' />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function handleUpdate(id) {
    console.log("Update action for id:", id);
}

function handleReject(id) {
    console.log("Reject action for id:", id);
}

export default Image_Manegement;
