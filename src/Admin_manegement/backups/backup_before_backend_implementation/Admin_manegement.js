import React, { useState } from 'react';
import './Admin_manegement.css';
import delete_1 from '../assets/plus-circle.png';
import Sidebarr from '../Sidebarr/Sidebarr'
import Navbar from '../Navbarr/Navbarr'



const AdminManagementPage = () => {
  const sampleData = [
    { name: 'Admin 1', domainId: '1234' },
    { name: 'Admin 2', domainId: '5678' },
    { name: 'Admin 3', domainId: '91011' },
  ];

  const [admins, setAdmins] = useState(sampleData);
  const [searchTerm, setSearchTerm] = useState('');
  const [newAdmin, setNewAdmin] = useState({ name: '', domainId: '' });
  const [showModal, setShowModal] = useState(false);

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle new admin input change
  const handleNewAdminChange = (event) => {
    const { name, value } = event.target;
    setNewAdmin((prevAdmin) => ({ ...prevAdmin, [name]: value }));
  };

  // Function to add a new admin
  const addAdmin = () => {
    if (newAdmin.name && newAdmin.domainId) {
      setAdmins((prevAdmins) => [...prevAdmins, newAdmin]);
      setNewAdmin({ name: '', domainId: '' });
      setShowModal(false);
    }
  };

  // Function to delete an admin with confirmation
  const deleteAdmin = (index) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this admin?");
    if (isConfirmed) {
      const updatedAdmins = [...admins];
      updatedAdmins.splice(index, 1);
      setAdmins(updatedAdmins);
    }
  };

  // Function to filter admins based on search term
  const filteredAdmins = admins.filter((admin) =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.domainId.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              />
              <button onClick={() => { }}>Search</button>
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
                      <td>{admin.domainId}</td>
                      <td>
                        <button className='delete' onClick={() => deleteAdmin(index)}>Delete Admin</button>
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
                  <h2 className='add_admin'>Add New Admin</h2>
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
                    value={newAdmin.Email}
                    onChange={handleNewAdminChange}
                    name="Email"
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
