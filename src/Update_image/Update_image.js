import React, { useState, useEffect } from 'react';
import './Update_image.css';
import add from '../assets/plus.png';
import ZoomIcon from "../assets/Zoom_a.png"; // Ensure this path is correct
import Sidebarr from '../Sidebarr/Sidebarr';

export default function UpdateImage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentRowId, setCurrentRowId] = useState(null);
    const [attachedImages, setAttachedImages] = useState({});
    const [zoomedImage, setZoomedImage] = useState(null);

    useEffect(() => {
        handleSearch();
    }, [searchTerm]);

    const handleSearch = () => {
        console.log('Search Term:', searchTerm);
    };

    const openModal = (rowId) => {
        setCurrentRowId(rowId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) {
            console.error('No file selected!');
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            const imageUrl = event.target.result;
            setAttachedImages((prevImages) => ({
                ...prevImages,
                [currentRowId]: imageUrl,
            }));
        };
        fileReader.readAsDataURL(file);
        closeModal();
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
           
            <div className='updateImageMian'>

              
                    <div className="searchupdateimage-container">
                        <input
                            type="text"
                            placeholder="Search Through Description and material code"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
        

              
                    <div className="update-table-container">
                        <table className="updateimage-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Material Code</th>
                                    <th>Material Description</th>
                                    <th>Material Image</th>
                                    <th>New Image</th>
                                    <th>Attached Image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2].map((id) => (
                                    <tr key={id}>
                                        <td>{id}</td>
                                        <td>
                                            <div className='material_update'>
                                                <div className='material_code'>
                                                    <span>{id === 1 ? '123445' : '1237654'}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='md_update'>
                                            {id === 1
                                                ? 'FREQ CONV PM2-D35.1WVA02 181-00841 MOOG'
                                                : 'FREQ CONV PM2-D35.1WVA02 181-76543 MOOG'}
                                        </td>
                                        <td>
                                            <div className='upload-imagem'>
                                                {/* Assuming Material Image column will be filled from the server */}
                                                <img src={`/path/to/server/image${id}.jpg`} alt="Material" className='add-image' />
                                                <div className='zoom-icon-container' onClick={() => handleZoom(`/path/to/server/image${id}.jpg`)}>
                                                    <img src={ZoomIcon} alt="Zoom Icon" className='zoom-icon' />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <button className="image-add" onClick={() => openModal(id)}>
                                                <img src={add} alt="Add Icon" /> Add
                                            </button>
                                        </td>
                                        <td>
                                            <div className='replace-image'>
                                                {attachedImages[id] && (
                                                    <div className='upload-imagem'>
                                                        <img src={attachedImages[id]} alt="Attached" className='add-image' />
                                                        <div className='zoom-icon-container' onClick={() => handleZoom(attachedImages[id])}>
                                                            <img src={ZoomIcon} alt="Zoom Icon" className='zoom-icon' />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td>
                                            <button className='replace_update' onClick={() => openModal(id)}>
                                                Replace
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {isModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <h2>Upload Image for Row {currentRowId}</h2>
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <input type="file" onChange={handleImageUpload} />
                                    <button type="button" onClick={closeModal}>Close Modal</button>
                                </form>
                            </div>
                        </div>
                    )}
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
