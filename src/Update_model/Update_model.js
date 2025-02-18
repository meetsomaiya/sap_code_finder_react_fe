import React, { useState, useEffect } from 'react';
import './Update_model.css';
import Sidebarr from '../Sidebarr/Sidebarr';
import { Button, List, ListItem, Checkbox, Popover, ListItemText } from '@mui/material';
import MyIcon from '../assets/plus (1).png';

function Update_model() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [replacedTo, setReplacedTo] = useState({});

    const defaultData = [
        {
            materialCode: "123445",
            materialDescription: "FREQ CONV PM2-D35.1WVA02 181-00841 MOOG",
            materialModel: ["S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII"],
            addModel: ["S67-MarkII", "S82", "s52"],
            ReplacedTo: ["S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII", "S66-MarkII"],
            action: "Replace"
        },
        {
            materialCode: "123446",
            materialDescription: "FREQ CONV PM2-D35.1WVA02 181-00842 MOOG",
            materialModel: ["S67-MarkII", "S67-MarkII", "S67-MarkII", "S67-MarkII", "S67-MarkII"],
            addModel: ["S67-MarkII", "S82", "s52"],
            ReplacedTo: ["S67-MarkII", "S67-MarkII", "S67-MarkII", "S67-MarkII", "S67-MarkII"],
            action: "Replace"
        },
        {
            materialCode: "123446",
            materialDescription: "FREQ CONV PM2-D35.1WVA02 181-00842 MOOG",
            materialModel: ["S67-MarkII", "S67-MarkII", "S67-MarkII", "S67-MarkII", "S67-MarkII"],
            addModel: ["S67-MarkII", "S82", "s52"],
            ReplacedTo: ["S67-MarkII", "S67-MarkII", "S67-MarkII", "S67-MarkII", "S67-MarkII"],
            action: "Replace"
        }
    ];

    useEffect(() => {
        handleSearch();
    }, [searchQuery]);

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

    const handleUpdate = (index) => {
        console.log("Update button clicked for index:", index);
    };

    const courses = [
        { id: 1, label: 'S67-MarkII' },
        { id: 2, label: 'S52' },
        { id: 3, label: 'S82' },
        { id: 4, label: 'S88' },
        { id: 5, label: 'S67-MarkII' },
    ];

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

    const handleToggleDropdown = (index) => (event) => {
        setAnchorEl(event.currentTarget);
        setDropdownOpen(index);
    };
    const handleCloseDropdown = () => {
        setDropdownOpen(null);
    };

    const open = dropdownOpen !== null;
    const id = open ? 'simple-popover' : undefined;
    return (
        <div className='main'>
           
                <Sidebarr />
    
            <div className='updateModelMain'>

                    <div className="search-bar-updatemodeli">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by Material Code and Material Description"
                        />
                        <button onClick={handleSearch} disabled={isLoading}>
                            {isLoading ? 'Searching...' : 'Search'}
                        </button>
                    </div>   
       

                
                    <div className="modelupade-table-container">
                        <table className="modelupdate-table">
                            <thead>
                                <tr>
                                    <th>Material Code</th>
                                    <th className='model_update'>Material Description</th>
                                    <th>Material Model</th>
                                    <th>Add Model</th>
                                    <th>Replaced To</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item, index) => (
                                    <tr key={index}>

                                        <td>
                                            <div className='material_updatemodel'>
                                                <div className='material_codemodel'>
                                                    {item.materialCode}
                                                </div>
                                            </div>
                                        </td>

                                        <td>{item.materialDescription}</td>

                                        <td>
                                            <div className='ReplacedForm'>
                                                {item.materialModel.map((materialModel, idx) => (
                                                    <div className='ReplacedForm_container' key={idx}>
                                                        <span>{materialModel.toLowerCase()}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>

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
                                                    <div className='ReplacedForm_container' key={idx}>
                                                        <span>{ReplacedTo.toLowerCase()}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </td>

                                        <td>
                                            <button className='update-btn-model' onClick={() => handleUpdate(index)}>Update</button>
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

export default Update_model;
