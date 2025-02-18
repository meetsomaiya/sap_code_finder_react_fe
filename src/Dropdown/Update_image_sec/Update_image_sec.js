import React, { useState, useEffect } from 'react';
import './Update_image_sec.css';
import add from '../../assets/plus.png';

export default function Update_image_sec({ show, handleClose }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isReplaceModalOpen, setIsReplaceModalOpen] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [attachedImage, setAttachedImage] = useState(null);

    useEffect(() => {
        handleSearch();
    }, [searchTerm]);

    const handleSearch = () => {
        console.log('Search Term:', searchTerm);
    };

    const openUploadModal = () => {
        setIsUploadModalOpen(true);
    };

    const closeUploadModal = () => {
        setIsUploadModalOpen(false);
    };

    const handleUpload = (event) => {
        event.preventDefault();
        setIsUploadModalOpen(false);

        const file = event.target.files[0];
        if (!file) {
            console.error('No file selected!');
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            const imageUrl = event.target.result;
            setAttachedImage(imageUrl);
        };
        fileReader.readAsDataURL(file);
    };

    const openReplaceModal = () => {
        setIsReplaceModalOpen(true);
    };

    const closeReplaceModal = () => {
        setIsReplaceModalOpen(false);
    };

    const handleReplace = (event) => {
        event.preventDefault();
        setIsReplaceModalOpen(false);

        const file = event.target.files[0];
        if (!file) {
            console.error('No file selected!');
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            const imageUrl = event.target.result;
            setAttachedImage(imageUrl);
        };
        fileReader.readAsDataURL(file);
    };

    return (
        <div className={`sec-modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
            <div className="sec-modal-dialog">
                <div className="sec-modal-content">

                    <div className="sec-modal-header">
                        <button type="button" className="sec-close" onClick={handleClose}>X</button>
                    </div>

                    <div className="sec-modal-body">

                        <div className='search-containerm_sec'>
                            <div className="searchupdateimage-container_sec">
                                <input
                                    type="text"
                                    placeholder="Search Through Description or material code"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button onClick={handleSearch}>Search</button>
                            </div>
                        </div>
                        
                        <div className="update-image-container_sec">
                            <div className="update-table-container_sec">
                                <table className="updateimage-table_sec">
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
                                        <tr>
                                            <td>1</td>
                                            <td>
                                                <div className='material_update_sec'>
                                                    <div className='material_code_sec'>
                                                        <span>123445</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='md_update'>FREQ CONV PM2-D35.1WVA02 181-00841 MOOG</td>
                                            <td>
                                                <div className='upload-imagem_sec'>
                                                    <div className='add_sec'>
                                                        {uploadedImage && <img src={uploadedImage} alt="Material" />}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <button className="image-add_sec" onClick={openUploadModal}>
                                                    <img src={add} alt="Add Icon" /> Add
                                                </button>
                                            </td>
                                            <td>
                                                <div className='replace-image_sec'>
                                                    {attachedImage && <img src={attachedImage} alt="Material" className='add-image_sec' />}
                                                </div>
                                            </td>
                                            <td>
                                                <button className='replace_update_sec' onClick={openReplaceModal}>Replace</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>
                                                <div className='material_update_sec'>
                                                    <div className='material_code_sec'>
                                                        <span>1237654</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='md_update_sec'>FREQ CONV PM2-D35.1WVA02 181-76543 MOOG</td>
                                            <td>
                                                <div className='upload-imagem_sec'>
                                                    {uploadedImage && <img src={uploadedImage} alt="Material" className='add-image_sec' />}
                                                </div>
                                            </td>
                                            <td>
                                                <button className="image-add_sec" onClick={openUploadModal}>
                                                    <img src={add} alt="Add Icon" /> Add
                                                </button>
                                            </td>
                                            <td>
                                                <div className='replace-image_sec'>
                                                    {attachedImage && <img src={attachedImage} alt="Material" className='add-image_sec' />}
                                                </div>
                                            </td>
                                            <td>
                                                <button className='replace_update_sec' onClick={openReplaceModal}>Replace</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {isUploadModalOpen && (
                                <div className="modal">
                                    <div className="modal-content">
                                        <h2>Upload Image</h2>
                                        <form>
                                            <input type="file" onChange={handleUpload} />
                                            <button type="submit">Upload</button>
                                        </form>
                                        <button onClick={closeUploadModal}>Close Modal</button>
                                    </div>
                                </div>
                            )}
                            {isReplaceModalOpen && (
                                <div className="modal">
                                    <div className="modal-content">
                                        <h2>Replace Image</h2>
                                        <form>
                                            <input type="file" onChange={handleReplace} />
                                            <button type="submit">Replace</button>
                                        </form>
                                        <button onClick={closeReplaceModal}>Close Modal</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
