import React, { useState, useEffect } from 'react';
import './Image_Update_History.css'; // Import your CSS file
import previousMaterialImageUrl from "../assets/images 2.png"
import newMaterialImageUrl from "../assets/products7.jpg"
import ZoomIcon from "../assets/Zoom_a.png"; // Ensure this path is correct
import Sidebarr from '../Sidebarr/Sidebarr'

function Image_Update_History() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [zoomedImage, setZoomedImage] = useState(null);

    // Sample data - replace this with your actual data
    const originalData = [
        { id: 1, materialCode: "ABC123", materialDescription: "FREQ CONV PM2-D35.1WVA02 181-00870", previousMaterialImageUrl: `${previousMaterialImageUrl}`, newMaterialImageUrl: `${newMaterialImageUrl}`, replaceInfo: "Replacement Info 1" },
        { id: 2, materialCode: "XYZ456", materialDescription: "FREQ CONV PM2-D35.1WVA02 181-00870", previousMaterialImageUrl: `${previousMaterialImageUrl}`, newMaterialImageUrl: `${newMaterialImageUrl}`, replaceInfo: "Replacement Info 2" },
        { id: 3, materialCode: "XYZ456", materialDescription: "FREQ CONV PM2-D35.1WVA02 181-00870", previousMaterialImageUrl: `${previousMaterialImageUrl}`, newMaterialImageUrl: `${newMaterialImageUrl}`, replaceInfo: "Replacement Info 2" },
        // Add more data as needed
    ];

    // Set default search results to original data
    useEffect(() => {
        setSearchResults(originalData);
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchTerm]); // Trigger search whenever searchTerm changes

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        const results = originalData.filter(item => {
            // Check if the Material Code or Material Description contains the searchTerm
            return (
                item.materialCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.materialDescription.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        setSearchResults(results);
    };

    const handleButtonClick = () => {
        handleSearch();
    };

    // Function to handle zoom
    const handleZoom = (image) => {
        setZoomedImage(image);
    };

    // Function to close zoom modal
    const closeZoom = () => {
        setZoomedImage(null);
    };

    return (
        <div className='main'>
            
                <Sidebarr />
        
            <div className='imageUpdateHistoryMain'>
              
                    <div className="search-imageupdate">
                        <input
                            type="text"
                            placeholder="Search by Material Code and Material Description"
                            value={searchTerm}
                            onChange={handleChange}
                        />
                        <button onClick={handleButtonClick}>Search</button>
                    </div>
            

                    <div className="imaget-history-table-container">
                        <table className="imaget-history">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Material Code</th>
                                    <th>Material Description</th>
                                    <th>Previous Material Image</th>
                                    <th>New Material Image</th>
                                    <th>Replace By</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>
                                            <div className='imagehistory_update'>
                                                <div className='imagehistory_code'>
                                                    <span>{item.materialCode}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item.materialDescription}</td>
                                        <td>
                                            <div className='add_image'>
                                                <img src={item.previousMaterialImageUrl} alt="Previous Material" className='image_size' />
                                                <div className='zoom-icon-container' onClick={() => handleZoom(item.previousMaterialImageUrl)}>
                                                    <img src={ZoomIcon} alt="Zoom Icon" className='zoom-icon' />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='add_image'>
                                                <img src={item.newMaterialImageUrl} alt="New Material" className='image_size' />
                                                <div className='zoom-icon-container' onClick={() => handleZoom(item.newMaterialImageUrl)}>
                                                    <img src={ZoomIcon} alt="Zoom Icon" className='zoom-icon' />
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item.replaceInfo}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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
       
    );
}

export default Image_Update_History;
