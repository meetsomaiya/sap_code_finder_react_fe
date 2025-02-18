import React, { useState } from 'react';
import './Image_History.css'
import Sidebarr  from '../Sidebarr/Sidebarr'

function Image_History() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Sample data - replace this with your actual data
    const originalData = [
        { id: 1, materialCode: "ABC123", materialDescription: "Material Description 1", previousMaterialImageUrl: "previous_material_image_url", newMaterialImageUrl: "new_material_image_url", replaceInfo: "Replacement Info 1" },
        { id: 2, materialCode: "XYZ456", materialDescription: "Material Description 2", previousMaterialImageUrl: "previous_material_image_url", newMaterialImageUrl: "new_material_image_url", replaceInfo: "Replacement Info 2" },
        { id: 3, materialCode: "XYZ456", materialDescription: "Material Description 2", previousMaterialImageUrl: "previous_material_image_url", newMaterialImageUrl: "new_material_image_url", replaceInfo: "Replacement Info 2" },
        // Add more data as needed
    ];

    // Set default search results to original data
    useState(() => {
        setSearchResults(originalData);
    }, []);

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        const results = originalData.filter(item => {
            // Check if the Material Code or Material Description contains the searchTerm
            return (
                item.materialCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.materialDescription.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });
        setSearchResults(results);
    };

    return (
        <div>
            <div className=' mt-[10px]'>
                <Sidebarr />
            </div>
            <div className="search-imageupdate">
                <input
                    type="text"
                    placeholder="Search by Material Code or Material Description"
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="imagen-history-container">
            <div className="imagen-history-table-container">
            <table className="imagen-history">
                <thead>
                    <tr>
                        <th className='imagen-history-table-th'>ID</th>
                        <th className='imagen-history-table-th'>Material Code</th>
                        <th className='imagen-history-table-th'>Material Description</th>
                        <th className='imagen-history-table-th'>Previous Material Image</th>
                        <th className='imagen-history-table-th'>New Material Image</th>
                        <th className='imagen-history-table-th'>Replace By</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults.map(item => (
                        <tr key={item.id}>
                            <td className='imagen-history-table-td'>{item.id}</td>
                            <td className='imagen-history-table-td'>{item.materialCode}</td>
                            <td className='imagen-history-table-td'>{item.materialDescription}</td>

                            <td className='imagen-history-table-td'>
                                <div className='add_image'>
                                    <img src={item.previousMaterialImageUrl} alt="Previous Material" className='image_size' />
                                </div>
                            </td>

                            <td className='imagen-history-table-td'>
                                <div className='add_image'>
                                    <img src={item.newMaterialImageUrl} alt="New Material" className='image_size' />
                                </div>
                            </td>
                            <td className='imagen-history-table-td'>{item.replaceInfo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            </div>
        </div>
    );
}

export default Image_History
