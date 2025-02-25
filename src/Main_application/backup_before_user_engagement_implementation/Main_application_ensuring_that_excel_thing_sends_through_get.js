import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Search from '../assets/Search.svg'
import "./Main_application.css";
import { Modal, Box, Button, Typography } from '@mui/material';
import pdfIcon from '../assets/PDF.jpg';
import excelIcon from '../assets/excel - Copy.jpg';
import ZoomIcon from '../assets/Zoom_a.png'; // Ensure this path is correct
import AddIcon from '@mui/icons-material/Add';
import Navbar from '../Navbarr/Navbarr'

import { useLocation, useNavigate } from 'react-router-dom';

import { BASE_URL } from '../config';

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

    const [domainId, setDomainId] = useState('');

    const [empCode, setEmpCode] = useState('');
    const [userName, setUserName] = useState('');
    const [emailId, setEmailId] = useState('');

    const navigate = useNavigate();



    useEffect(() => {
        // Fetch the top 10 results on initial load or whenever search text changes
        const query = searchText.trim() !== '' ? `?query=${encodeURIComponent(searchText)}` : '';
        console.log(`Sending search query: ${searchText}`);
        // fetch(`${BASE_URL}fetch_data.php${query}`)
        fetch(`${BASE_URL}/api/fetch_data${query}`)
        // fetch(`http://localhost:3000/api/fetch_data${query}`)
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
        // fetch(`${BASE_URL}/fetch_alternate_table_data.php?material_code=${encodeURIComponent(materialCode)}`)
         fetch(`${BASE_URL}/api/fetch_alternate_table_data?material_code=${encodeURIComponent(materialCode)}`)
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
                        fetch(`https://suzomsapps.suzlon.com/Services/SAPCodeFinderBE/lastprocured.php?materialCode=${encodeURIComponent(item.material_code)}`)
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
                    fetch(`https://suzomsapps.suzlon.com/Services/SAPCodeFinderBE/lastprocured.php?materialCode=${encodeURIComponent(materialCode)}`)
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
                fetch(`https://suzomsapps.suzlon.com/Services/SAPCodeFinderBE/lastprocured.php?materialCode=${encodeURIComponent(materialCode)}`)
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
        // fetch(`${BASE_URL}/download_row_data.php`, {
            fetch(`${BASE_URL}/api/download_row_data`, {
            // fetch(`http://localhost:3000/api/download_row_data`, {
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
         console.log('Material Code for download excel:', materialCode); // Debugging line
        // fetch(`${BASE_URL}/download_row_data2.php`, {
            fetch(`${BASE_URL}/api/download_row_data2`, {
            // fetch(`http://localhost:3000/api/download_row_data2`, {
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


  
        // Function to extract domain_id from URL
        // Function to extract domain_id from POST data (keeping original function name)
        //POST METHOD 
        // const extractDomainIdFromUrl = () => {
        //     try {
        //       // Assuming you have a way to access the POST data in your environment
        //       const postData = getPostData(); // Replace with your method to retrieve POST data

        //       if (!postData || !postData.domain_id) {
        //         console.error('POST data does not contain domain_id');
        //         return null;
        //       }

        //       const domainIdFromPost = postData.domain_id;
        //       console.log('Domain ID from POST data:', domainIdFromPost);

        //       return domainIdFromPost;
        //     } catch (error) {
        //       console.error('Error extracting domain_id from POST:', error);
        //       return null;
        //     }
        //   };

        useEffect(() => {
            const extractDomainIdFromUrl = () => {
                try {
                    const hash = window.location.hash;
                    console.log('Window location hash:', hash);
    
                    const queryString = hash.split('?')[1];
                    if (!queryString) {
                        console.error('Hash does not contain query parameters');
                        return null;
                    }
    
                    console.log('Query string:', queryString);
    
                    const urlParams = new URLSearchParams(queryString);
                    const domainIdFromUrl = urlParams.get('domain_id');
                    console.log('Domain ID from URL:', domainIdFromUrl);
    
                    return domainIdFromUrl;
                } catch (error) {
                    console.error('Error extracting domain_id:', error);
                    return null;
                }
            };
    
            const extractedDomainId = extractDomainIdFromUrl();
            console.log('Extracted Domain ID:', extractedDomainId);
            setDomainId(extractedDomainId);
    
            // const fetchUserData = () => {
            //     if (extractedDomainId) {
            //         // const apiUrl = `${BASE_URL}/api_for_auto_login.php`;
            //         // const apiUrl = 'localhost:8889/api_for_auto_login.php';
            //         const apiUrl = `${BASE_URL}/api/api_for_auto_login`;
            //         const encodedDomainId = encodeURIComponent(extractedDomainId);
            //         const requestData = `action=auto_login&domain_id=${encodedDomainId}`;
    
            //         console.log('Sending data to API:', requestData);
    
            //         fetch(apiUrl, {
            //             method: 'POST',
            //             headers: {
            //                 'Content-Type': 'application/x-www-form-urlencoded'
            //             },
            //             body: requestData
            //         })
            //         .then(response => {
            //             console.log('API Response Status:', response.status);
            //             if (!response.ok) {
            //                 throw new Error('Network response was not ok');
            //             }
    
            //             navigate('/Main_application/Main_application');
            //             return response.json();
            //         })
            //         .then(data => {
            //             console.log('Received data from API:', data);
    
            //             const { empCode, userName, emailId } = data.data;
    
            //             setEmpCode(empCode);
            //             setUserName(userName);
            //             setEmailId(emailId);
    
            //             console.log('Employee Code:', empCode);
            //             console.log('User Name:', userName);
            //             console.log('Email ID:', emailId);
    
            //             localStorage.setItem('user-name', userName);
            //         })
            //         .catch(error => {
            //             console.error('API Error:', error);
            //         });
            //     } else {
            //         console.error('Domain ID not found in URL');
            //     }
            // };

            // const fetchUserData = () => {
            //     if (extractedDomainId) {
            //         const encodedDomainId = encodeURIComponent(extractedDomainId);
            //          const apiUrl = `${BASE_URL}/api/api_for_auto_login?action=auto_login&domain_id=${encodedDomainId}`;

            //         // const apiUrl = `http://localhost:223/api/api_for_auto_login?action=auto_login&domain_id=${encodedDomainId}`;

            //       //  const apiUrl = `http://localhost:3001/api/api_for_auto_login?action=auto_login&domain_id=${encodedDomainId}`;
            
            //         console.log('API URL:', apiUrl); // Log the URL to verify
            
            //         fetch(apiUrl, {
            //             method: 'GET',
            //         })
            //         .then(response => {
            //             console.log('API Response Status:', response.status);
            //             if (!response.ok) {
            //                 throw new Error('Network response was not ok');
            //             }
            
            //             navigate('/Main_application/Main_application');
            //             return response.json();
            //         })
            //         .then(data => {
            //             console.log('Received data from API:', data);
            
            //             const { empCode, userName, emailId } = data.data;
            
            //             setEmpCode(empCode);
            //             setUserName(userName);
            //             setEmailId(emailId);
            
            //             console.log('Employee Code:', empCode);
            //             console.log('User Name:', userName);
            //             console.log('Email ID:', emailId);
            
            //             localStorage.setItem('user-name', userName);
            //         })
            //         .catch(error => {
            //             console.error('API Error:', error);
            //         });
            //     } else {
            //         console.error('Domain ID not found in URL');
            //     }
            // };

            const fetchUserData = () => {
                if (extractedDomainId) {
                    const apiUrl = `${BASE_URL}/api/api_for_auto_login?action=auto_login&domain_id=${extractedDomainId}`;
            
                    console.log("API URL:", apiUrl); // Log the URL to verify
            
                    fetch(apiUrl, { method: "GET" })
                        .then((response) => {
                            console.log("API Response Status:", response.status);
                            if (!response.ok) {
                                throw new Error("Network response was not ok");
                            }
            
                            return response.json();
                        })
                        .then((data) => {
                            console.log("Received data from API:", data);
            
                            if (data) {
                                // Extract data from API response
                                const {
                                    DomainId,
                                    Name,
                                    EmailId,
                                    Department,
                                    ContactNumber,
                                    MobileNumber,
                                    EmpGrade,
                                    IsActive,
                                } = data;
            
                                // ✅ Store values in cookies WITHOUT encoding
                                document.cookie = `domain_id=${DomainId}; path=/`;
                                document.cookie = `userName=${Name}; path=/`;
                                document.cookie = `email=${EmailId}; path=/`;
                                document.cookie = `department=${Department}; path=/`;
                                document.cookie = `contactNumber=${ContactNumber}; path=/`;
                                document.cookie = `mobileNumber=${MobileNumber}; path=/`;
                                document.cookie = `empGrade=${EmpGrade}; path=/`;
                                document.cookie = `isActive=${IsActive}; path=/`;
            
                                console.log("Session cookies set successfully!");
            
                                // ✅ Log all cookies to verify
                                console.log("All Cookies:", document.cookie);
            
                                // Redirect to main application
                                navigate("/Main_application/Main_application");
                            } else {
                                console.error("Invalid API response format");
                            }
                        })
                        .catch((error) => {
                            console.error("API Error:", error);
                        });
                } else {
                    console.error("Domain ID not found in URL");
                }
            };
            
    
            fetchUserData();
    
            const pollingInterval = setInterval(() => {
                const storedUserName = localStorage.getItem('user-name');
                if (storedUserName !== userName) {
                    fetchUserData();
                }
            }, 5000);
    
            return () => clearInterval(pollingInterval);
        }, [userName, navigate]);

    /* dummy functions */

    // Simulated function to retrieve POST data
    const getPostData = () => {
        // Simulating POST data retrieval (replace with actual method)
        return {
            domain_id: 'MzkxOTI='
        };
    };

    // Function to handle button click
    const sendDomainId = () => {
        try {
            const postData = getPostData();
            if (!postData || !postData.domain_id) {
                throw new Error('POST data does not contain domain_id');
            }
            setDomainId(postData.domain_id);
            console.log('Domain ID retrieved:', postData.domain_id);

            // Optionally, you can call your function here
            // extractDomainIdFromUrl(postData.domain_id);
        } catch (error) {
            console.error('Error extracting domain_id:', error);
        }
    };


    const inputRef = React.useRef(null);

    const handleClick = () => {
        // Focus the input field when the search box is clicked
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };


    const handleChange = (e) => {
        setSearchText(e.target.value);
    }


    return (
        <>
            <Navbar />
            {/* <div>
      <button onClick={sendDomainId}>Send Domain ID</button>
      {domainId && (
        <p>Domain ID: {domainId}</p>
      )}
    </div> */}

            <div className='bodycontainer'>
                {/* 
                <div className='main_button'>
                    <Link to="/Admin_manegement/Admin_manegement">
                        <button type="button" className="main_button_btn">
                        Admin Page
                    </button>
                    </Link>
                </div> */}

                <div className="search-containermain">
                    <div className="search_Box" onClick={handleClick} >
                        <input
                            type="text"
                            placeholder="Material and Material code wise description"
                            value={searchText}
                            onChange={handleChange}
                            className="search-input"
                            ref={inputRef}
                        />
                        <img src={Search} alt="Search Icon" />
                    </div>
                </div>

                <div className="main-container">
                    <div className="mainapplication-container">
                        <table className="Main_application">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Material Code</th>
                                    <th>Material Description </th>
                                    <th>Download</th>
                                </tr>
                            </thead>

                            <tbody>
                                {displayedData.map((item, index) => (
                                    <tr key={index} onClick={() => handleRowClick(item.material_code)}>
                                        <td>{item.id}</td>
                                        <td>
                                            <div className='model_container'>
                                                <div className='material_mainapplication'>
                                                    {item.material_code}
                                                </div>
                                            </div>
                                        </td>
                                        <td className='collText'>{item.material_description}</td>
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
                                                <td className='collText' onClick={() => copyToClipboard(item.material_description)}>
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