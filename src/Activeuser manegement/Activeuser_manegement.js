import React, { useState, useEffect } from 'react';
import './Activeuser_manegement.css'; // Import the CSS file
import delete_1 from '../assets/plus-circle.png';
import Sidebarr from '../Sidebarr/Sidebarr'
import Navbar from '../Navbarr/Navbarr'

import { BASE_URL } from '../config' ;

function Active_user() {
  // Sample data
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // const data = [
  //   { id: 1, name: 'John Doe', domainId: 'JD123', lastLoggedIn: '2024-05-08 10:30:00' },
  //   { id: 2, name: 'Jane Smith', domainId: 'JS456', lastLoggedIn: '2024-05-07 14:45:00' },
  //   { id: 3, name: 'Mike Johnson', domainId: 'MJ163', lastLoggedIn: '2024-05-08 10:30:00' },
  //   { id: 4, name: 'Emily Brown', domainId: 'EB786', lastLoggedIn: '2024-05-07 14:45:00' },
  //   { id: 5, name: 'David Lee', domainId: 'DL89823', lastLoggedIn: '2024-05-08 10:30:00' },
  //   { id: 6, name: 'Sophia Wilson', domainId: 'SW67556', lastLoggedIn: '2024-05-07 14:45:00' },
  //   { id: 7, name: 'Michael Taylor', domainId: 'MT3543', lastLoggedIn: '2024-05-08 10:30:00' },
  //   { id: 8, name: 'Olivia Martinez', domainId: 'OMwey6', lastLoggedIn: '2024-05-07 14:45:00' },
  //   // Add more data as needed
  // ];

  useEffect(() => {
    const fetchActiveUserData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/fetch_active_user_data.php`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching active user data:', error);
        setError('Error loading data');
      }
    };

    fetchActiveUserData();
  }, []);

  // Filter data based on search term
  const handleSearch = () => {
    const filtered = data.filter(
      item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.domainId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };
  // Auto-search whenever searchTerm changes
  useEffect(() => {
    handleSearch();
  }, [searchTerm]);


  return (

    <>
    <Navbar/>
        <div className='main'>
    
        <Sidebarr />

          <div className='activeUserMain'>

          <div className='admin-options-Btn'>
            <button className='add-admin-button'>
              <img src={delete_1} alt='Add Icon' className='icon' /> Add New User
            </button>
          </div>

        
            <div className='searchactive-container'>
              <input
                type='text'
                className='search-input_1'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder='Search by Name and Domain Id'
              />
              <button className='search_active' onClick={handleSearch}>Search</button>
            </div>
          

       
            <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <table className='activetable-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>DomainId</th>
              <th>Last logged In</th>
            </tr>
          </thead>
          <tbody>
            {(filteredData.length > 0 ? filteredData : data).map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.domain_id}</td>
                <td>{item.last_login_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>

          </div>
        </div>



     
    </>

  );
}

export default Active_user;
