import React, { useState, useEffect } from 'react';
import '../Pending_Image/Pending_Image.css';
import MaterialImage from "../../assets/images 2.png";
import ZoomIcon from "../../assets/Zoom_a.png";

function Pending_Image({ show, handleClose }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [attachedImages, setAttachedImages] = useState({});

    const Data = [
        {
            id: 1,
            domainId: 1883,
            materialCode: "123445",
            materialDescription: "FREQ CONV PM2-D35.1WVA02 181-00841 MOOG",
            MaterialImage: `${MaterialImage}`
        },
        {
            id: 2,
            domainId: 123,
            materialCode: "123445",
            materialDescription: "FREQ CONV PM2-D35.1WVA02 181-00841 MOOG",
            MaterialImage: `${MaterialImage}`
        },
        {
            id: 3,
            domainId: 12378654,
            materialCode: "123445",
            materialDescription: "FREQ CONV PM2-D35.1WVA02 181-00870",
            MaterialImage: `${MaterialImage}`
        }
    ];

    const filterData = (query) => {
        return Data.filter(item =>
            item.domainId?.toString().includes(query) ||
            item.materialDescription.toLowerCase().includes(query.toLowerCase())
        );
    };

    const handleInputChange = (e) => {
        const { value } = e.target;
        setSearchQuery(value);
        handleSearch();
    };

    const handleSearch = () => {
        const newData = filterData(searchQuery);
        setFilteredData(newData);
    };

    useEffect(() => {
        setFilteredData(Data);
    }, []);

    const handleZoom = (imageUrl) => {
        console.log("Zoom action for image URL:", imageUrl);
    };

    const handleUpdate = (id) => {
        console.log("Update action for id:", id);
    };

    const handleReject = (id) => {
        console.log("Reject action for id:", id);
    };

    return (
        <div className={`pending-modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
            <div className="pending-modal-dialog">
                <div className="pending-modal-content">

                    <div className="pending-modal-header">
                        <button type="button" className="pending-close" onClick={handleClose}>X</button>
                    </div>


                    <div className="pending-modal-body">

                        <div className='pending-searchbar'>
                            <div className="search-bar-pending">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleInputChange}
                                    placeholder="Search by Domain ID or Material Description"
                                />
                                <button onClick={() => handleSearch(searchQuery)}>Search</button> {/* Trigger search manually */}
                            </div>
                        </div>


                        <div className="Pending_Image-container">
                            <div className="Pending_table-container">
                                <table className="Pending_table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Domain ID</th>
                                            <th>Material Code</th>
                                            <th className='pending_image'>Material Description</th>
                                            <th>Material Image</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.domainId}</td>
                                                <td>{item.materialCode}</td>
                                                <td>{item.materialDescription}</td>
                                                <td>
                                                    <div className='pending-image'>
                                                        {attachedImages[item.id] && (
                                                            <div className='pending-imagem'>
                                                                <img src={attachedImages[item.id]} alt="Attached" className='add-image' />
                                                                <div className='zoom-icon-container' onClick={() => handleZoom(attachedImages[item.id])}>
                                                                    <img src={ZoomIcon} alt="Zoom Icon" className='zoom-icon' />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='flex flex-row'>
                                                        <button className="update-btn-model" onClick={() => handleUpdate(item.id)}>Update</button>
                                                        <button className="reject-btn_model" onClick={() => handleReject(item.id)}>Reject</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pending_Image;
