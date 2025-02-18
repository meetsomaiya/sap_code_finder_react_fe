import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Main_application.css";
import { Modal, Box, Button, Typography } from '@mui/material';
import pdfIcon from '../assets/PDF.jpg';
import excelIcon from '../assets/excel - Copy.jpg';
import ZoomIcon from '../assets/Zoom_a.png'; // Ensure this path is correct
import AddIcon from '@mui/icons-material/Add';
import Navbar from '../Navbarr/Navbarr'

import { BASE_URL } from '../config' ;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '1px solid #00978D',
    boxShadow: 24,
    p: 4,
};

const sampleData = [
    { id: 1, MaterialCode: '123445', materialDescription: 'FREQ CONV PM2-D35.1WVA02 181-00841 MOOG', materialCode: 'ABC123', lastProcured: 'Not Procured in 6 Months', models: 'S66-MarkII, S66-MarkII, S66-MarkII, S66-MarkII, S66-MarkII, S66-MarkII, S66-MarkII, S66-MarkII, S66-MarkII, S66-MarkII' },
    { id: 2, MaterialCode: '133445', materialDescription: 'FREQ CONV PM2-D35.1WVA02 181-56768 MOOG', materialCode: 'DEF456', lastProcured: 'Not Procured in 2 Months', models: 'S66-MarkII, S66-MarkII, S66-MarkII, S66-MarkII, S66-MarkII, S66-MarkII, S66-MarkII, S66-MarkII, S66-MarkII, S66-MarkII' },
];

export default function MainApplication() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(sampleData);
    const [clickedMaterialCode, setClickedMaterialCode] = useState(null);
    const [uploadedImages, setUploadedImages] = useState({});
    const [open, setOpen] = useState(false);
    const [zoomedImage, setZoomedImage] = useState(null);


    /* after api integration */const [alternateTableData, setAlternateTableData] = useState([]); // State for alternate table data
    const [searchText, setSearchText] = useState('');
    const [displayedData, setDisplayedData] = useState([]);
    const [imageCache, setImageCache] = useState({}); // Assuming you have a state for uploaded images
    const [lastProcuredData, setLastProcuredData] = useState({});


    useEffect(() => {
        // Fetch the top 10 results on initial load or whenever search text changes
        const query = searchText.trim() !== '' ? `?query=${encodeURIComponent(searchText)}` : '';
        console.log(`Sending search query: ${searchText}`);
        fetch(`${BASE_URL}fetch_data.php${query}`)
            .then(response => response.json())
            .then(data => {
                setDisplayedData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [searchText]);

    useEffect(() => {
        const filtered = sampleData.filter(item =>
            item.MaterialCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.materialDescription.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchQuery]);

    // const handleRowClick = (MaterialCode) => {
    //     if (clickedMaterialCode !== MaterialCode) {
    //         setClickedMaterialCode(MaterialCode);
    //     }
    // };
    const handleRowClick = (materialCode) => {
        console.log(`Row clicked: ${materialCode}`);
        setClickedMaterialCode(materialCode);

        // Fetch data from the first API
        fetch(`${BASE_URL}/fetch_alternate_table_data.php?material_code=${encodeURIComponent(materialCode)}`)
            .then(response => response.json())
            .then(data => {
                // Check if the response contains data
                if (data && (Array.isArray(data) ? data.length > 0 : true)) {
                    // Handle both single and multiple entries in the response
                    const dataArray = Array.isArray(data) ? data : [data];
                    setAlternateTableData(dataArray);
                    console.log('Fetched alternate table data:', dataArray);

                    // Fetch last procured date for each material in the response from the first API
                    dataArray.forEach(item => {
                        fetch(`http://10.102.0.192:1234/lastprocured.php?materialCode=${encodeURIComponent(item.material_code)}`)
                            .then(response => response.json())
                            .then(procuredData => {
                                setLastProcuredData(prevState => ({
                                    ...prevState,
                                    [item.material_code]: procuredData.MONTH_START || 'Material Inactive'
                                }));
                            })
                            .catch(error => {
                                console.error('Error fetching last procured data:', error);
                                setLastProcuredData(prevState => ({
                                    ...prevState,
                                    [item.material_code]: 'Material Inactive'
                                }));
                            });
                    });
                } else {
                    // If no data is returned from the first API, call the second API with the original material code
                    fetch(`http://10.102.0.192:1234/lastprocured.php?materialCode=${encodeURIComponent(materialCode)}`)
                        .then(response => response.json())
                        .then(procuredData => {
                            setLastProcuredData(prevState => ({
                                ...prevState,
                                [materialCode]: procuredData.MONTH_START || 'Material Inactive'
                            }));
                        })
                        .catch(error => {
                            console.error('Error fetching last procured data:', error);
                            setLastProcuredData(prevState => ({
                                ...prevState,
                                [materialCode]: 'Material Inactive'
                            }));
                        });
                }
            })
            .catch(error => {
                console.error('Error fetching alternate table data:', error);
                // If the first API call fails, still attempt to fetch data from the second API
                fetch(`http://10.102.0.192:1234/lastprocured.php?materialCode=${encodeURIComponent(materialCode)}`)
                    .then(response => response.json())
                    .then(procuredData => {
                        setLastProcuredData(prevState => ({
                            ...prevState,
                            [materialCode]: procuredData.MONTH_START || 'Material Inactive'
                        }));
                    })
                    .catch(error => {
                        console.error('Error fetching last procured data:', error);
                        setLastProcuredData(prevState => ({
                            ...prevState,
                            [materialCode]: 'Material Inactive'
                        }));
                    });
            });
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImages(prevImages => ({ ...prevImages, [clickedMaterialCode]: reader.result }));
                handleClose();
            };
            reader.readAsDataURL(file);
        }
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleZoom = (image) => {
        setZoomedImage(image);
    };

    const closeZoom = () => {
        setZoomedImage(null);
    };

    const renderModels = (models) => {
        if (!models) {
            return 'No models available';
        }
        if (typeof models === 'string') {
            return models.split(',').join(', ');
        }
        return 'Invalid models format';
    };

    /*copy to clipboard function for alternate table */
    // Function to handle copying text to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                alert(`Copied to clipboard: ${text}`);
            })
            .catch((err) => {
                console.error('Failed to copy: ', err);
            });
    };

    /* handle pdf download */
    // Function to handle the PDF download request
    const handlePdfDownload = (materialCode) => {
        fetch(`${BASE_URL}/download_row_data.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ material_code: materialCode })
        })
            .then(response => {
                if (response.ok) {
                    return response.blob();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(blob => {
                // Create a URL for the blob and set it as the href of an anchor element
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                // Set the download attribute to dynamically set the filename
                a.download = materialCode + '.pdf';
                a.href = url;
                document.body.appendChild(a); // Append the anchor to the document body
                a.click(); // Simulate a click to trigger the download
                a.remove(); // Remove the anchor from the document body
                window.URL.revokeObjectURL(url); // Revoke the object URL to free up memory
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };


    // Function to handle the Excel download request
    const handleExcelDownload = (materialCode) => {
        fetch(`${BASE_URL}/download_row_data2.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ material_code: materialCode })
        })
            .then(response => {
                if (response.ok) {
                    return response.blob();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(blob => {
                // Create a URL for the blob and set it as the href of an anchor element
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                // Set the download attribute to dynamically set the filename
                a.download = materialCode + '.xlsx'; // Assuming it's an Excel file
                a.href = url;
                document.body.appendChild(a); // Append the anchor to the document body
                a.click(); // Simulate a click to trigger the download
                a.remove(); // Remove the anchor from the document body
                window.URL.revokeObjectURL(url); // Revoke the object URL to free up memory
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };


    useEffect(() => {
        // Function to get the domainId from URL query parameters
        const getDomainIdFromUrl = () => {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('domainId');
        };
    
        // Function to decode Base64
        const decodeBase64 = (str) => {
            try {
                return atob(str);
            } catch (e) {
                console.error('Failed to decode Base64:', e);
                return null;
            }
        };
    
        const sendDomainIdToApi = async (encodedDomainId) => {
            console.log('Sending encoded domain_id:', encodedDomainId);
        
            try {
                const postData = `action=auto_login&domain_id=${encodedDomainId}`;
        
                const response = await fetch('http://localhost:8090/api_for_auto_login.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: postData
                });
        
                if (response.ok) {
                    const responseData = await response.json();
                    console.log('API Response:', responseData);
                } else {
                    const errorData = await response.json();
                    console.error('API Error:', errorData);
                }
            } catch (error) {
                console.error('Fetch Error:', error);
            }
        };
        
        
        // Main function to retrieve, decode and send domainId
        const mainFunction = () => {
            const domainId = getDomainIdFromUrl();
            if (domainId) {
                const decodedDomainId = decodeBase64(domainId);
                if (decodedDomainId) {
                    sendDomainIdToApi(decodedDomainId);
                }
            }
        };
    
        mainFunction();
    }, []);
    
    return (
        <> 
        <Navbar/>
            
            <div className='bodycontainer'>
                
        

            <div className='main_button'>
                <Link to="/Admin_manegement/Admin_manegement">
                    <button type="button" className="main_button_btn">
                        Admin Page
                    </button>
                </Link>
            </div>
            <div className="search-containermain">
                <input
                    type="text"
                    placeholder="Search Through Description and material code"
                    value={searchText}
                    onInput={(e) => setSearchText(e.target.value)}
                    className="search-input"
                />
                <button className="search-button">Search</button>
            </div>

            <div className="main-container">
                <div className="mainapplication-container">
                    <table className="Main_application">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Material Code</th>
                                <th>Material Description</th>
                                <th>Download</th>
                                {/* <th>Model Image</th>
                            <th>Model</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {displayedData.map((item, index) => (
                                <tr key={index} onClick={() => handleRowClick(item.material_code)}>
                                    <td>{item.id}</td>
                                    <td>
                                        <div className='model_container'>
                                            <div className='material_mainapplication no-underline'>
                                                {item.material_code}
                                            </div>
                                        </div>
                                    </td>
                                    <td className='main_application-width'>{item.material_description}</td>
                                    <td>
                                        <div className="action-icons">
                                            <img
                                                src={pdfIcon}
                                                alt="PDF"
                                                className="pdf-icon"
                                                aria-label="PDF"
                                                onClick={() => handlePdfDownload(item.material_code)}
                                            />
                                            <div className="separator"></div>
                                            <img src={excelIcon} alt="Excel" className="excel-icon" aria-label="Excel" onClick={() => handleExcelDownload(item.material_code)} />
                                        </div>
                                    </td>
                                    {/* <td>
                                    {imageCache[item.material_code] ? (
                                        <div className='main-application-image'>
                                            <img src={imageCache[item.material_code]} alt="Material" className='image_size' />
                                            <div className='zoom-icon-container' onClick={() => handleZoom(imageCache[item.material_code])}>
                                                <img src={ZoomIcon} alt="Zoom Icon" className='zoom-icon' />
                                            </div>
                                        </div>
                                    ) : (
                                        <Button className='upload-button' variant="outlined" onClick={handleOpen}>
                                            <AddIcon className='icon-size' style={{ marginRight: '8px', color: '#00781A' }} />
                                            <span className='text_upload'>Add</span>
                                        </Button>
                                    )}
                                </td> */}
                                    {/* <td style={{ width: '35%' }}>
                                    <div className='modelm_container'>
                                        <div className='modelm_parent'>
                                            {renderModels(item.models)}
                                        </div>
                                    </div>
                                </td> */}

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>



                {clickedMaterialCode && alternateTableData.length > 0 && (
                    <div className="additional-code-container">
                        <div className="additional-table-container">
                            <table className="additional-table">
                                <thead>
                                    <tr>
                                        <th>Material Code</th>
                                        <th className='main-width'>Material Description</th>
                                        <th>Last Procured</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alternateTableData.map((item, index) => (
                                        <tr key={index}>
                                            <td onClick={() => copyToClipboard(item.material_code)}>
                                                <div className='model_container'>
                                                    <div className='material_mainapplication'>
                                                        {item.material_code}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='main_application_additional' onClick={() => copyToClipboard(item.material_description)}>
                                                {item.material_description}
                                            </td>
                                            <td onClick={() => copyToClipboard(lastProcuredData[item.material_code] || 'Loading...')}>
                                                {lastProcuredData[item.material_code] || 'Loading...'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Upload Image
                    </Typography>
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                </Box>
            </Modal>

            <Modal
                open={Boolean(zoomedImage)}
                onClose={closeZoom}
                aria-labelledby="zoom-modal-title"
                aria-describedby="zoom-modal-description"
            >
                <Box sx={{ ...style, width: 'auto', height: 'auto', maxWidth: '90%', maxHeight: '90%' }}>
                    <span className='close' onClick={closeZoom}>&times;</span>
                    <img src={zoomedImage} alt="Zoomed Material" className='zoomed-image' />
                </Box>
            </Modal>

        
                
            </div>
        </>
    );
}
