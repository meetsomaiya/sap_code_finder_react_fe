import React, { useState, useEffect } from 'react';
import './Model_Update_History.css';
import Sidebarr from '../Sidebarr/Sidebarr'

function Model_Update_History() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Sample default data
    const defaultData = [
        {
            materialCode: "123445",
            materialDescription: "FREQ CONV PM2-D35.1WVA02 181-00841 MOOG",
            ReplacedForm: ["S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII"],
            ReplacedTo: ["S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII"],
            ReplacedBy: "Pratik patil"
        },
        {
            materialCode: "123445",
            materialDescription: "FREQ CONV PM2-D35.1WVA02 181-009834 MOOG",
            ReplacedForm: ["S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII"],
            ReplacedTo: ["S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII"],
            ReplacedBy: "Pratik patil"
        },
        {
            materialCode: "123445",
            materialDescription: "FREQ CONV PM2-D35.1WVA02 181-00876 MOOG",
            ReplacedForm: ["S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII"],
            ReplacedTo: ["S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII"],
            ReplacedBy: "Pratik patil"
        },
    ];
    useEffect(() => {
        handleSearch(); // Trigger search on initial render
    }, [searchQuery]); // Trigger search whenever searchQuery changes

    // Function to filter data based on search query
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
        setFilteredData(defaultData);
    }, []);

    return (
        <div className='main'>

            <Sidebarr />

            <div className='modelUpdateHistoryMain'>

                
                    <div className="search-bar-modelhistory">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by Material Code and Material Description"
                        />
                        <button onClick={handleSearch} disabled={isLoading}>{isLoading ? 'Searching...' : 'Search'}</button>
                    </div>
         

                
     
                    <div className="model-history-table-container">
                        <table className="modelhistory-table">
                            <thead>
                                <tr>
                                    <th>Material Code</th>
                                    <th className='model_cld'>Material Description</th>
                                    <th>Replaced Form</th>
                                    <th>Replaced To</th>
                                    <th>Replaced By</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Use filteredData instead of hard-coded data */}
                                {filteredData.map((item, index) => (
                                    <tr key={index}>

                                        <td>
                                            <div className='modelhistory_update'>
                                                <div className='modelhistory_code'>
                                                    <span>12376</span>
                                                </div>
                                            </div>
                                        </td>



                                        <td>{item.materialDescription}</td>
                                        <td>
                                            <div className='ReplacedForm'>
                                                {item.ReplacedForm.map((ReplacedForm, idx) => (
                                                    <div className='ReplacedForm_container' key={idx}>
                                                        <span>{ReplacedForm}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td>
                                            <div className='ReplacedForm'>
                                                {item.ReplacedTo.map((ReplacedTo, idx) => (
                                                    <div className='ReplacedForm_container' key={idx}>
                                                        <span>{ReplacedTo}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                        <td>{item.ReplacedBy}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
       
    );
}

export default Model_Update_History;
