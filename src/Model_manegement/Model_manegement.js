import React, { useState, useEffect } from 'react';
import './Model_manegement.css';
import Sidebarr from '../Sidebarr/Sidebarr'
import MyIcon from '../assets/plus (1).png';

// changes done by kunal
import { Button, List, ListItem, Checkbox, Popover, ListItemText } from '@mui/material';

function Model_manegement() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);


    // Sample default data
    const defaultData = [
        {
            id: 1,
            name: "pratik patil",
            domainId: 1239876,
            materialCode: "9584758695",
            materialDescription: "FREQ CONV PM2-D35.1WVA02 181-00841 MOOG",
            // models: ["S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII"]
            addModel: ["S67-MarkII", "S82", "s52"],
            ReplacedTo: [],
        },
        {
            id: 2,
            name: "pratik",
            domainId: 12345654,
            materialCode: "9568254536",
            materialDescription: "FREQ CONV PM2-D35.1WVA02 181-00841 MOOG",
            // models: ["S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII"]
            addModel: ["S67-MarkII", "S82", "s52"],
            ReplacedTo: [],
        },
        {
            id: 3,
            name: "KUNAL",
            domainId: 6658479,
            materialCode: "8798456512",
            materialDescription: "FREQ CONV PM2-D35.1WVA02 181- MOOG46573",
            // models: ["S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII"
            // ]

            addModel: ["S67-MarkII", "S82", "s52"],
            ReplacedTo: [],
        },
        // Add more default data as needed
    ];

    // Function to filter data based on search query
    const filterData = (query) => {
        return defaultData.filter(item =>
            item.domainId.toString().includes(query) || item.materialDescription.includes(query)
        );
    };

    // Function to handle update action
    const handleUpdate = (id) => {
        // Handle update action
        console.log("Update action for id:", id);
    };

    // Function to handle reject action
    const handleReject = (id) => {
        // Handle reject action
        console.log("Reject action for id:", id);
    };

    // Function to handle search
    const handleSearch = () => {
        const newData = filterData(searchQuery);
        setFilteredData(newData);
    };

    // Auto-search when searchQuery changes
    useEffect(() => {
        handleSearch();
    }, [searchQuery]);

    // Set default data on component mount
    useEffect(() => {
        setFilteredData(defaultData);
    }, []);


    // changes done by kunal

    const [anchorEl, setAnchorEl] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [replacedTo, setReplacedTo] = useState({});

    const handleToggleDropdown = (index) => (event) => {
        setAnchorEl(event.currentTarget);
        setDropdownOpen(index);
    };

    const handleRemoveItem = (materialCode, index) => {
        const newReplacedTo = { ...replacedTo };
        newReplacedTo[materialCode].splice(index, 1); // Remove the item at the specified index
        setReplacedTo(newReplacedTo);
    };

    const handleCourseChange = (course, itemIndex) => {
        const item = filteredData[itemIndex];
        if (!item) return;

        const newReplacedTo = { ...replacedTo };

        if (!newReplacedTo[item.materialCode]) {
            newReplacedTo[item.materialCode] = [...item.ReplacedTo];
        }

        if (newReplacedTo[item.materialCode].includes(course.label)) {
            newReplacedTo[item.materialCode] = newReplacedTo[item.materialCode].filter(model => model !== course.label);
        } else {
            newReplacedTo[item.materialCode].push(course.label);
        }

        setReplacedTo(newReplacedTo);
    };


    const open = dropdownOpen !== null;
    const id = open ? 'simple-popover' : undefined;

    const handleCloseDropdown = () => {
        setDropdownOpen(null);
    };

    const courses = [
        { id: 1, label: 'S67-Mark II' },
        { id: 2, label: 'S52' },
        { id: 3, label: 'S82' },
        { id: 4, label: 'S88' },
        { id: 5, label: 'S67-Mark I' },
    ];



    return (
        <div className='main'>
           
                <Sidebarr />
           
            <div className='modelManagementMain'>

                    <div className="search-bar-modelmanegement">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by Domain ID and Material Description"
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
             

              
                    <div className="modelm-table-container">
                        <table className="modelm-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Domain ID</th>
                                    <th>Material Code</th>
                                    <th className='model_cld'>Material Description</th>
                                    <th>Add Model</th>
                                    <th>Model</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Use filteredData instead of hard-coded data */}
                                {filteredData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.domainId}</td>
                                        <td>
                                            <div className='material_model'>
                                                <div className='model_material'>
                                                    <span>{item.materialCode}</span>
                                                </div>
                                            </div>
                                        </td>



                                        <td>{item.materialDescription}</td>


                                        {/* changes done by kunal  */}
                                        <td>
                                            <Button
                                                variant="outlined"
                                                onClick={handleToggleDropdown(index)}
                                                className="custom-dropdown-button my-custom-button"
                                                startIcon={<img src={MyIcon} alt="Add Icon" style={{ width: '10px', height: '10px' }} />}
                                            >
                                                Add
                                            </Button>


                                            <Popover
                                                id={id}
                                                open={open && dropdownOpen === index}
                                                anchorEl={anchorEl}
                                                onClose={handleCloseDropdown}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'left',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'left',
                                                }}
                                                className="custom-popover"
                                            >
                                                <List>
                                                    {courses.map((course) => (
                                                        <ListItem
                                                            key={course.id}
                                                            role={undefined}
                                                            dense
                                                            button
                                                            onClick={() => handleCourseChange(course, index)}
                                                        >
                                                            <Checkbox
                                                                checked={replacedTo[item.materialCode]?.includes(course.label) || false}
                                                            />
                                                            <ListItemText className="custom-list-item-text" primary={course.label} />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </Popover>


                                        </td>



                                        <td>
                                            <div className='ReplacedForm'>
                                                {(replacedTo[item.materialCode] || item.ReplacedTo).map((ReplacedTo, idx) => (
                                                    <div className='ReplacedForm_container'   key={idx}>
                                                        <span>{ReplacedTo.toLowerCase()}</span>
                                                        {/* Add the "x" button for removal */}
                                                        <button className='modelXb' onClick={() => handleRemoveItem(item.materialCode, idx)}>x</button>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>

                                        {/* <td>
                                            <div className='model-m'>replaced 
                                                {item.models.map((model, idx) => (
                                                    <div className='model_container-m' key={idx}>
                                                        <span>{model}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </td> */}
                                        <td>
                                            <div className='flex flex-row'>
                                                <button className="update-btn-model " onClick={() => handleUpdate(item.id)}>Update</button>
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
   
    );
}

export default Model_manegement;
