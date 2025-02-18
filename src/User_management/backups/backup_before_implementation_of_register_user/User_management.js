import React, { useState, useEffect } from 'react';
import './User_management.css';
import add_admin from '../assets/plus-circle.png';
import all_data from '../assets/download.png';
import * as XLSX from 'xlsx';
import Sidebarr from '../Sidebarr/Sidebarr';

import Navbar from '../Navbarr/Navbarr'

const UserManagementPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [domainId, setDomainId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [accessLevel, setAccessLevel] = useState('User');
  // const [allUsers, setAllUsers] = useState([
  //   { name: 'Pratik Patil', domainId: '123456', access: 'User' },
  //   { name: 'Girish Divase', domainId: '673456', access: 'User' },
  //   { name: 'Pratik Patil', domainId: '783456', access: 'User' }
  // ]);


  const [allUsers, setAllUsers] = useState([]);

    // Function to fetch users
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8092/fetch_users.php');
        if (response.ok) {
          const data = await response.json();
          setAllUsers(data);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    // Fetch users on component mount
    useEffect(() => {
      fetchUsers();
    }, []);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, allUsers]); // Trigger search whenever searchQuery or allUsers changes

  const handleSearch = () => {
    const filteredResults = allUsers.filter(user => {
      return (
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.domainId.includes(searchQuery)
      );
    });
    setSearchResults(filteredResults);
  };

  const downloadExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(allUsers);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'all_users.xlsx');
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openUpdateModal = (user) => {
    setSelectedUser(user);
    setDomainId(user.domainId);
    setName(user.name);
    setEmail(user.email || '');
    setAccessLevel(user.access);
    setIsUpdateOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedUser(null);
    setDomainId('');
    setName('');
    setEmail('');
    setAccessLevel('User');
    setIsUpdateOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAdmin = {
      name: name,
      domainId: domainId,
      access: accessLevel
    };

    const updatedUsers = [...allUsers, newAdmin];
    setAllUsers(updatedUsers);

    setDomainId('');
    setName('');
    setEmail('');
    setAccessLevel('User');
    setIsOpen(false);
    handleSearch(); // Update search results after adding a new user
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const updatedUsers = allUsers.map(user =>
      user.domainId === selectedUser.domainId
        ? { ...user, name: name, email: email, access: accessLevel }
        : user
    );
    setAllUsers(updatedUsers);

    setSelectedUser(null);
    setDomainId('');
    setName('');
    setEmail('');
    setAccessLevel('User');
    setIsUpdateOpen(false);
    handleSearch(); // Update search results after updating a user
  };

  const handleDelete = (domainId) => {
    const updatedUsers = allUsers.filter(user => user.domainId !== domainId);
    setAllUsers(updatedUsers);
    handleSearch(); // Update search results after deleting a user
  };

  return (
    <>
    <Navbar/>
    <div className='main'>

      <Sidebarr />


      <div className='user_container'>
        
        <div className='button_div'>
          <button className="user-admin-button" onClick={openModal}>
            <img src={add_admin} alt="Add Icon" className="icon" /> Add New user
          </button>

          <button className="user-admin-button" onClick={downloadExcel}>
            <img src={all_data} alt="Add Icon" className="icon" /> All User Data
          </button>
        </div>

       
          <div className="search-bar-user">
            <input
              type="text"
              placeholder="Search by Name and Domain ID"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
      
          <div className="user-table-container">
      <table className="userm-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Domain ID</th>
            <th>Access</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.length > 0 ? (
            searchResults.map(user => (
              <tr key={user.domain_id}>
                <td>{user.name}</td>
                <td>{user.domain_id}</td>
                <td>{user.access}</td>
                <td>
                  <button className="Updatebutton-user" onClick={() => openUpdateModal(user)}>Update Account</button>
                  <button className="deletebutton-user" onClick={() => handleDelete(user.domain_id)}>Delete User</button>
                </td>
              </tr>
            ))
          ) : (
            allUsers.map(user => (
              <tr key={user.domain_id}>
                <td>{user.name}</td>
                <td>{user.domain_id}</td>
                <td>{user.access}</td>
                <td>
                  <button className="Updatebutton-user" onClick={() => openUpdateModal(user)}>Update Account</button>
                  <button className="deletebutton-user" onClick={() => handleDelete(user.domain_id)}>Delete User</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
      

        {isOpen && (
          <div className="modal-overlay">
            <div className="modal-overlay-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <h2 className="modal-overlay-heading">Add New User</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="domainId">Domain ID:</label>
                  <input type="text" id="domainId" value={domainId} onChange={e => setDomainId(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="accessLevel">Access Level:</label>
                  <select id="accessLevel" value={accessLevel} onChange={e => setAccessLevel(e.target.value)}>
                    <option value="User">User</option>
                    <option value="Siteincharge">Site Incharge</option>
                    <option value="OperationalEngineer">Operational Engineer</option>
                    <option value="AreaOperationalEngineer">Area Operational Engineer</option>
                    <option value="Area Incharge">Area Incharge</option>
                    <option value="SiteOperationalEngineer">Site Operational Engineer</option>
                    <option value="StateOperationalEngineer">State Operational Engineer</option>
                    <option value="stateHead">State Head</option>
                  </select>
                </div>
                <button type="submit" className="btn-register">Register</button>
              </form>
            </div>
          </div>
        )}

        {isUpdateOpen && selectedUser && (
          <div className="modal-overlay">
            <div className="modal-overlay-content">
              <span className="close" onClick={closeUpdateModal}>&times;</span>
              <h2 className="modal-overlay-heading">Update User Information</h2>
              <form onSubmit={handleUpdateSubmit}>
                <div className="form-group">
                  <label htmlFor="domainId">Domain ID:</label>
                  <input type="text" id="domainId" value={domainId} disabled />
                </div>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="accessLevel">Access Level:</label>
                  <select id="accessLevel" value={accessLevel} onChange={e => setAccessLevel(e.target.value)}>
                    <option value="User">User</option>
                    <option value="Siteincharge">Site Incharge</option>
                    <option value="OperationalEngineer">Operational Engineer</option>
                    <option value="AreaOperationalEngineer">Area Operational Engineer</option>
                    <option value="Area Incharge">Area Incharge</option>
                    <option value="SiteOperationalEngineer">Site Operational Engineer</option>
                    <option value="StateOperationalEngineer">State Operational Engineer</option>
                    <option value="stateHead">State Head</option>
                  </select>
                </div>
                <button type="submit" className="btn-update">Update</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>

    </>
  );
};

export default UserManagementPage;
