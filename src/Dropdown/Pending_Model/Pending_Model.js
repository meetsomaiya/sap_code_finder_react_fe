import React, { useState, useEffect } from 'react';
import './Pending_Model.css';

function Pending_Model({ show, handleClose }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const defaultData = [
        {
            id: 1,
            domainId: 9526,
            materialCode: "123445",
            materialDescription: "FREQ CONV PM2-D35.1WVA02 181-00841 MOOG",
            models: ["S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII"]
        },
        {
            id: 2,
            domainId: 7584,
            materialCode: "1234456789",
            materialDescription: "FREQ CONV PM2-D35.1WVA02 181-00841 MOOG",
            models: ["S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII"]
        },
        {
            id: 3,
            domainId: 3621,
            materialCode: "123445",
            materialDescription: "FREQ CONV PM2-D35.1WVA02 181- MOOG46573",
            models: ["S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII"]
        }
    ];

    const filterData = (query) => {
        return defaultData.filter(item =>
            item.domainId.toString().includes(query) || item.materialDescription.includes(query)
        );
    };

    const handleUpdate = (id) => {
        console.log("Update action for id:", id);
    };

    const handleReject = (id) => {
        console.log("Reject action for id:", id);
    };

    const handleSearch = () => {
        const newData = filterData(searchQuery);
        setFilteredData(newData);
    };

    useEffect(() => {
        handleSearch();
    }, [searchQuery]);

    useEffect(() => {
        setFilteredData(defaultData);
    }, []);

    return (
        <div className={`pendingmodel-modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
            <div className="pendingmodel-modal-dialog">
                <div className="pendingmodel-modal-content">

                    <div className="pendingmodel-modal-header">
                        <button type="button" className="pendingmodel-close" onClick={handleClose}>X</button>
                    </div>

                    <div className="pendingmodel-modal-body">

                        <div className='pendingmodel-search'>
                            <div className="search-bar-pendingmodel">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by Domain ID or Material Description"
                                />
                                <button onClick={handleSearch}>Search</button>
                            </div>
                        </div>
                        
                        <div className="pendingmodel-container">
                            <div className="pendingmodel-table-container">
                                <table className="pendingmodel-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Domain ID</th>
                                            <th>Material Code</th>
                                            <th className='pendingmodel_cld'>Material Description</th>
                                            <th>Model</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.domainId}</td>
                                                <td>
                                                    <div className='material_pendingmodel'>
                                                        <div className='pendingmodel_material'>
                                                            <span>{item.materialCode}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{item.materialDescription}</td>
                                                <td>
                                                    <div className='pendingmodel-m'>
                                                        {item.models.map((model, idx) => (
                                                            <div className='pendingmodel_container' key={idx}>
                                                                <span>{model}</span>
                                                            </div>
                                                        ))}
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

export default Pending_Model;
