import React, { useState, useEffect } from 'react';
import './Update_model_sec.css';

function Update_model_sec({ show, handleClose }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const defaultData = [
        {
            materialCode: "123445",
            materialDescription: "FREQ CONV PM2-D35.1WVA02 181-00841 MOOG",
            materialModel: ["S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII"],
            addModel: ["Option1", "Option2", "Option3"],
            ReplacedTo: ["S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII"],
            action: "Replace"
        },
        {
            materialCode: "123446",
            materialDescription: "FREQ CONV PM2-D35.1WVA02 181-00842 MOOG",
            materialModel: ["S67-MarkII", "S67-MarkII", "S67-MarkII", "S67-MarkII", "S67-MarkII"],
            addModel: ["Option1", "Option2", "Option3"],
            ReplacedTo: ["S67-MarkII", "S67-MarkII", "S67-MarkII", "S67-MarkII", "S67-MarkII"],
            action: "Replace"
        }
    ];

    const filterData = (query) => {
        setIsLoading(true);
        const newData = defaultData.filter(item =>
            item.materialCode.includes(query) || item.materialDescription.toLowerCase().includes(query.toLowerCase())
        );
        setIsLoading(false);
        return newData;
    };

    const handleSearch = () => {
        const newData = filterData(searchQuery);
        setFilteredData(newData);
    };

    useEffect(() => {
        handleSearch();
    }, [searchQuery]);

    const handleUpdate = (index) => {
        console.log("Update button clicked for index:", index);
    };

    return (
        <div className={`udatem-modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
            <div className="udatem-modal-dialog">
                <div className="udatem-modal-content">

                    <div className="udatem-modal-header">
                        <button type="button" className="udatem-close" onClick={handleClose}>X</button>
                    </div>

                    <div className="udatem-modal-body">

                        <div className='update-search_sec'>
                            <div className="search-bar-model_sec">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by Material Code or Material Description"
                                />
                                <button onClick={handleSearch} disabled={isLoading}>{isLoading ? 'Searching...' : 'Search'}</button>
                            </div>
                        </div>
                        
                        <div className="update-model-container_sec">
                            <div className="modelupdate-table-container_sec">
                                <table className="modelupdate-table_sec">
                                    <thead>
                                        <tr>
                                            <th>Material Code</th>
                                            <th className='model_update_sec'>Material Description</th>
                                            <th>Material Model</th>
                                            <th>Add Model</th>
                                            <th>Replaced To</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.materialCode}</td>
                                                <td>{item.materialDescription}</td>
                                                <td>
                                                    <div className='ReplacedForm_sec'>
                                                        {item.materialModel.map((materialModel, idx) => (
                                                            <div className='ReplacedForm_container_sec' key={idx}>
                                                                <span>{materialModel}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='dropdown_sec'>
                                                        <select>
                                                            <option value="">Select</option>
                                                            {item.addModel.map((option, idx) => (
                                                                <option key={idx} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='ReplacedForm_sec'>
                                                        {item.ReplacedTo.map((ReplacedTo, idx) => (
                                                            <div className='ReplacedForm_container_sec' key={idx}>
                                                                <span>{ReplacedTo}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                                <td>
                                                    <button className='update-btn-model_sec' onClick={() => handleUpdate(index)}>Update</button>
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

export default Update_model_sec;
