import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Main_application.css";
import { Modal, Box, Button, Typography } from '@mui/material';
import pdfIcon from '../assets/PDF.jpg';
import excelIcon from '../assets/excel - Copy.jpg';
import ZoomIcon from '../assets/Zoom_a.png'; // Ensure this path is correct
import AddIcon from '@mui/icons-material/Add';

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

    const [searchText, setSearchText] = useState('');
    const [displayedData, setDisplayedData] = useState([]);
    const [imageCache, setImageCache] = useState({}); // Assuming you have a state for uploaded images

    useEffect(() => {
        // Fetch the data from the PHP API whenever search text changes
        if (searchText.trim() !== '') {
            console.log(`Sending search query: ${searchText}`);
            fetch(`http://localhost:8092/fetch_data.php?query=${encodeURIComponent(searchText)}`)
                .then(response => response.json())
                .then(data => {
                    setDisplayedData(data);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        } else {
            setDisplayedData([]);
        }
    }, [searchText]);

    useEffect(() => {
        const filtered = sampleData.filter(item =>
            item.MaterialCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.materialDescription.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchQuery]);

    const handleRowClick = (MaterialCode) => {
        if (clickedMaterialCode !== MaterialCode) {
            setClickedMaterialCode(MaterialCode);
        }
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
    

    return (
        <div>
            <div className='main_button'>
                <Link to="/">
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
                            <th>Model Image</th>
                            <th>Model</th>
                            <th>Download</th>
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
                                </td>
                                <td style={{ width: '35%' }}>
                                    <div className='modelm_container'>
                                        <div className='modelm_parent'>
                                            {renderModels(item.models)}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="action-icons flex flex-row">
                                        <img src={pdfIcon} alt="PDF" className="pdf-icon" aria-label="PDF" />
                                        <div className="separator"></div>
                                        <img src={excelIcon} alt="Excel" className="excel-icon" aria-label="Excel" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

                {clickedMaterialCode && (
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
                                    {sampleData.filter(item => item.MaterialCode === clickedMaterialCode).map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className='model_container'>
                                                    <div className='material_mainapplication'>
                                                        {item.materialCode}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='main_application_additional'>{item.materialDescription}</td>
                                            <td>{item.lastProcured}</td>
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
    );
}
