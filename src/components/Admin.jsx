import React, { useState } from 'react';
import './Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedItems, setSelectedItems] = useState([]);

  const mockPendingItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      uploader: "Sarah Johnson",
      category: "Outerwear",
      status: "Pending",
      uploadedAt: "2024-01-15"
    },
    {
      id: 2,
      title: "Summer Floral Dress",
      uploader: "Mike Wilson",
      category: "Dresses",
      status: "Pending",
      uploadedAt: "2024-01-14"
    },
    {
      id: 3,
      title: "Classic White Sneakers",
      uploader: "Emma Davis",
      category: "Shoes",
      status: "Pending",
      uploadedAt: "2024-01-13"
    }
  ];

  const mockApprovedItems = [
    {
      id: 4,
      title: "Blue T-Shirt",
      uploader: "John Smith",
      category: "Tops",
      status: "Approved",
      uploadedAt: "2024-01-12"
    }
  ];

  const mockRejectedItems = [
    {
      id: 5,
      title: "Inappropriate Item",
      uploader: "User123",
      category: "Tops",
      status: "Rejected",
      uploadedAt: "2024-01-11",
      reason: "Inappropriate content"
    }
  ];

  const handleSelectItem = (itemId) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSelectAll = () => {
    const currentItems = getCurrentItems();
    setSelectedItems(
      selectedItems.length === currentItems.length 
        ? [] 
        : currentItems.map(item => item.id)
    );
  };

  const handleApprove = () => {
    if (selectedItems.length === 0) {
      alert('Please select items to approve');
      return;
    }
    alert(`Approved ${selectedItems.length} item(s)`);
    setSelectedItems([]);
  };

  const handleReject = () => {
    if (selectedItems.length === 0) {
      alert('Please select items to reject');
      return;
    }
    alert(`Rejected ${selectedItems.length} item(s)`);
    setSelectedItems([]);
  };

  const handleRemove = () => {
    if (selectedItems.length === 0) {
      alert('Please select items to remove');
      return;
    }
    alert(`Removed ${selectedItems.length} item(s)`);
    setSelectedItems([]);
  };

  const getCurrentItems = () => {
    switch (activeTab) {
      case 'pending':
        return mockPendingItems;
      case 'approved':
        return mockApprovedItems;
      case 'rejected':
        return mockRejectedItems;
      default:
        return [];
    }
  };

  const currentItems = getCurrentItems();

  return (
    <div className="admin-container">
      <div className="admin-content">
        <header className="admin-header">
          <h1>Admin Panel</h1>
          <p>Moderate and manage item listings</p>
        </header>

        <div className="admin-stats">
          <div className="stat-card">
            <h3>Pending Items</h3>
            <p className="stat-number">{mockPendingItems.length}</p>
          </div>
          <div className="stat-card">
            <h3>Approved Items</h3>
            <p className="stat-number">{mockApprovedItems.length}</p>
          </div>
          <div className="stat-card">
            <h3>Rejected Items</h3>
            <p className="stat-number">{mockRejectedItems.length}</p>
          </div>
        </div>

        <nav className="admin-nav">
          <button 
            className={`nav-tab ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending Review
          </button>
          <button 
            className={`nav-tab ${activeTab === 'approved' ? 'active' : ''}`}
            onClick={() => setActiveTab('approved')}
          >
            Approved Items
          </button>
          <button 
            className={`nav-tab ${activeTab === 'rejected' ? 'active' : ''}`}
            onClick={() => setActiveTab('rejected')}
          >
            Rejected Items
          </button>
        </nav>

        <div className="admin-actions">
          <button 
            className="select-all-btn"
            onClick={handleSelectAll}
          >
            {selectedItems.length === currentItems.length ? 'Deselect All' : 'Select All'}
          </button>
          
          {activeTab === 'pending' && (
            <>
              <button 
                className="btn-approve"
                onClick={handleApprove}
                disabled={selectedItems.length === 0}
              >
                Approve Selected
              </button>
              <button 
                className="btn-reject"
                onClick={handleReject}
                disabled={selectedItems.length === 0}
              >
                Reject Selected
              </button>
            </>
          )}
          
          {(activeTab === 'approved' || activeTab === 'rejected') && (
            <button 
              className="btn-remove"
              onClick={handleRemove}
              disabled={selectedItems.length === 0}
            >
              Remove Selected
            </button>
          )}
        </div>

        <div className="items-table">
          <table>
            <thead>
              <tr>
                <th>
                  <input 
                    type="checkbox"
                    checked={selectedItems.length === currentItems.length && currentItems.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Item</th>
                <th>Uploader</th>
                <th>Category</th>
                <th>Status</th>
                <th>Uploaded</th>
                {activeTab === 'rejected' && <th>Reason</th>}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map(item => (
                <tr key={item.id}>
                  <td>
                    <input 
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleSelectItem(item.id)}
                    />
                  </td>
                  <td>
                    <div className="item-info">
                      <div className="item-image">👕</div>
                      <span className="item-title">{item.title}</span>
                    </div>
                  </td>
                  <td>{item.uploader}</td>
                  <td>{item.category}</td>
                  <td>
                    <span className={`status ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>{item.uploadedAt}</td>
                  {activeTab === 'rejected' && (
                    <td>{item.reason}</td>
                  )}
                  <td>
                    <div className="action-buttons">
                      <button className="btn-view">View</button>
                      {activeTab === 'pending' && (
                        <>
                          <button className="btn-approve-small">✓</button>
                          <button className="btn-reject-small">✗</button>
                        </>
                      )}
                      {(activeTab === 'approved' || activeTab === 'rejected') && (
                        <button className="btn-remove-small">🗑</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
