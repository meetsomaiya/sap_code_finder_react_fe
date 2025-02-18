import React, { useState, useEffect } from 'react';
import './Admin_manegement.css';
import delete_1 from '../assets/plus-circle.png';
import Sidebarr from '../Sidebarr/Sidebarr'
import Navbar from '../Navbarr/Navbarr'

import { BASE_URL } from '../config' ;



const AdminManagementPage = () => {

  
  const sampleData = [
    { name: 'Admin 1', domainId: '1234' },
    { name: 'Admin 2', domainId: '5678' },
    { name: 'Admin 3', domainId: '91011' },
  ];


     // Fetch all admins or filtered admins based on search term
  // Fetch all admins or filtered admins based on search term
  const fetchAdmins = async (query = '') => {
    try {
      const response = await fetch(`${BASE_URL}search_admins.php?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setAdmins(data);
          setFilteredAdmins(data);
        } else {
          console.error('Fetched data is not an array:', data);
          setAdmins([]);
          setFilteredAdmins([]);
        }
      } else {
        console.error('Failed to fetch admins');
        setAdmins([]);
        setFilteredAdmins([]);
      }
    } catch (error) {
      console.error('Error:', error);
      setAdmins([]);
      setFilteredAdmins([]);
    }
  };

  const deleteAdmin = async (domainId) => {
    if (window.confirm("Are you sure you want to delete this admin?")) {
        try {
          const response = await fetch(`${BASE_URL}delete_admin.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ domain_id: domainId })
            });

            const result = await response.json();

            if (response.ok && result.status === 'success') {
                alert('Admin deleted successfully');
                // Optionally refresh the admin list
                fetchAdmins();
            } else {
                alert('Failed to delete admin');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while deleting the admin');
        }
    }
};


  const [admins, setAdmins] = useState(sampleData);
  const [searchTerm, setSearchTerm] = useState('');
  const [newAdmin, setNewAdmin] = useState({ name: '', domainId: '', email: '' });
  const [showModal, setShowModal] = useState(false);
  const [filteredAdmins, setFilteredAdmins] = useState([]);



  // Handle new admin input change
  const handleNewAdminChange = (e) => {
    const { name, value } = e.target;
    setNewAdmin(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to add a new admin
  // const addAdmin = () => {
  //   if (newAdmin.name && newAdmin.domainId) {
  //     setAdmins((prevAdmins) => [...prevAdmins, newAdmin]);
  //     setNewAdmin({ name: '', domainId: '' });
  //     setShowModal(false);
  //   }
  // };

  // Function to delete an admin with confirmation
  // const deleteAdmin = (index) => {
  //   const isConfirmed = window.confirm("Are you sure you want to delete this admin?");
  //   if (isConfirmed) {
  //     const updatedAdmins = [...admins];
  //     updatedAdmins.splice(index, 1);
  //     setAdmins(updatedAdmins);
  //   }
  // };

  // Function to filter admins based on search term
  // const filteredAdmins = admins.filter((admin) =>
  //   admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   admin.domainId.toLowerCase().includes(searchTerm.toLowerCase())
  // );

    // Fetch admin details on component mount
    useEffect(() => {
      fetchAdmins();
    }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    console.log('Searching for:', query); // Log the search term
    setSearchTerm(query);
    fetchAdmins(query); // Fetch admins based on the current search term
  };

  // Fetch all admins on component mount
  useEffect(() => {
    fetchAdmins();
  }, []);

  const addAdmin = async () => {
    console.log('Data being passed:', newAdmin); // Log the data being passed
    try {
      const response = await fetch(`${BASE_URL}add_admin.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAdmin),
      });
      const result = await response.json();
      if (response.ok && result.status === 'success') {
        console.log('Admin added successfully:', result);
        alert('Admin added successfully'); // Display success message
        fetchAdmins(); // Refresh the admin list
        setShowModal(false); // Close the modal
      } else {
        console.error('Failed to add admin:', result.message);
        alert(`Error: ${result.message}`); // Display error message
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred'); // Display unexpected error message
    }
  };
  
  
  
  return (

    <>
    <Navbar/>
      <div className='main'>
        <Sidebarr />

        <div className='adminMain'>
          
            <div className="admin-options">
              <button className="add-admin-button" onClick={() => setShowModal(true)}>
                <img src={delete_1} alt="Add Icon" className="icon" /> Add New Admin
              </button>
            </div>


            <div className="search-bar-containeradmin">
        <input
          type="text"
          placeholder="Search Through Admin Name and DomainID"
          value={searchTerm}
          onChange={handleSearchChange}
          onInput={handleSearchChange} // Add onInput handler to support real-time search
        />
         <button onClick={() => {}}>Search</button>
      </div>
        


            <div className="adminm-table-container">
              <table className="adminm-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Domain ID</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdmins.map((admin, index) => (
                    <tr key={index}>
                      <td>{admin.name}</td>
                      <td>{admin.domain_id}</td>
                      <td>
                      <button className='delete' onClick={() => deleteAdmin(admin.domain_id)}>Delete Admin</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal form for adding a new admin */}
          
      {showModal && (
        <div className="modal-admin">
          <div className="modal-admin-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2 className="add_admin">Add New Admin</h2>
            <input
              type="text"
              placeholder="Name"
              value={newAdmin.name}
              onChange={handleNewAdminChange}
              name="name"
            />
            <input
              type="text"
              placeholder="Domain ID"
              value={newAdmin.domainId}
              onChange={handleNewAdminChange}
              name="domainId"
            />
            <input
              type="text"
              placeholder="Email"
              value={newAdmin.email}
              onChange={handleNewAdminChange}
              name="email"
            />
            <button onClick={addAdmin}>Add</button>
          </div>
        </div>
      )}
          </div>
        </div>
    
    </>

  );
};

export default AdminManagementPage;
