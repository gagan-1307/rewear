import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = ({ user, onLogout, userItems, communityItems }) => {
  const [activeTab, setActiveTab] = useState('profile');

  const handleLogout = () => {
    onLogout();
  };

  const mockUserData = {
    email: user?.email || 'user@example.com',
    points: 450,
    itemsUploaded: userItems.length,
    swapsCompleted: 8,
    swapsOngoing: 2
  };

  const mockSwaps = [
    { id: 1, type: "Ongoing", item: "Blue Denim Jacket", with: "Sarah", status: "Pending Response" },
    { id: 2, type: "Ongoing", item: "Summer Dress", with: "John", status: "Awaiting Approval" },
    { id: 3, type: "Completed", item: "Vintage T-Shirt", with: "Emma", status: "Completed" },
    { id: 4, type: "Completed", item: "Black Jeans", with: "Mike", status: "Completed" }
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>ReWear Dashboard</h1>
          <div className="user-info">
            <span>Welcome, {user?.email}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <nav className="dashboard-nav">
          <button 
            className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button 
            className={`nav-tab ${activeTab === 'items' ? 'active' : ''}`}
            onClick={() => setActiveTab('items')}
          >
            My Items
          </button>
          <button 
            className={`nav-tab ${activeTab === 'swaps' ? 'active' : ''}`}
            onClick={() => setActiveTab('swaps')}
          >
            Swaps
          </button>
          <button 
            className={`nav-tab ${activeTab === 'browse' ? 'active' : ''}`}
            onClick={() => setActiveTab('browse')}
          >
            Browse Items
          </button>
        </nav>

        <main className="dashboard-main">
          {activeTab === 'profile' && (
            <div className="profile-section">
              <div className="profile-header">
                <h2>Profile Details</h2>
                <div className="points-balance">
                  <span className="points-label">Points Balance</span>
                  <span className="points-value">{mockUserData.points}</span>
                </div>
              </div>

              <div className="profile-stats">
                <div className="stat-card">
                  <h3>Items Uploaded</h3>
                  <p className="stat-number">{mockUserData.itemsUploaded}</p>
                </div>
                <div className="stat-card">
                  <h3>Swaps Completed</h3>
                  <p className="stat-number">{mockUserData.swapsCompleted}</p>
                </div>
                <div className="stat-card">
                  <h3>Ongoing Swaps</h3>
                  <p className="stat-number">{mockUserData.swapsOngoing}</p>
                </div>
              </div>

              <div className="profile-actions">
                <Link to="/add-item" className="action-btn primary">
                  Upload New Item
                </Link>
                <button className="action-btn secondary">
                  Edit Profile
                </button>
              </div>
            </div>
          )}

          {activeTab === 'items' && (
            <div className="items-section">
              <h2>My Uploaded Items</h2>
              <div className="items-grid">
                {userItems.map(item => (
                  <div key={item.id} className="item-card">
                    <div className="item-image">👕</div>
                    <div className="item-info">
                      <h3>{item.title}</h3>
                      <p>{item.category} • {item.condition}</p>
                      <div className="item-actions">
                        <button className="btn-edit">Edit</button>
                        <button className="btn-remove">Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="add-item-card">
                  <div className="add-item-content">
                    <div className="add-icon">+</div>
                    <h3>Add New Item</h3>
                    <p>Share your clothing with the community</p>
                    <Link to="/add-item" className="add-item-btn">
                      Add Item
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'swaps' && (
            <div className="swaps-section">
              <h2>My Swaps</h2>
              <div className="swaps-tabs">
                <button className="swap-tab active">Ongoing</button>
                <button className="swap-tab">Completed</button>
              </div>
              <div className="swaps-list">
                {mockSwaps.filter(swap => swap.type === 'Ongoing').map(swap => (
                  <div key={swap.id} className="swap-card">
                    <div className="swap-info">
                      <h3>{swap.item}</h3>
                      <p>Swapping with: {swap.with}</p>
                      <span className={`swap-status ${swap.status.toLowerCase().replace(' ', '-')}`}>
                        {swap.status}
                      </span>
                    </div>
                    <div className="swap-actions">
                      <button className="btn-accept">Accept</button>
                      <button className="btn-decline">Decline</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'browse' && (
            <div className="browse-section">
              <h2>Browse Community Items</h2>
              <div className="search-filters">
                <input 
                  type="text" 
                  placeholder="Search items..." 
                  className="search-input"
                />
                <select className="filter-select">
                  <option>All Categories</option>
                  <option>Tops</option>
                  <option>Bottoms</option>
                  <option>Dresses</option>
                  <option>Outerwear</option>
                </select>
                <select className="filter-select">
                  <option>All Sizes</option>
                  <option>XS</option>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                </select>
              </div>
              <div className="items-grid">
                {communityItems.map(item => (
                  <div key={item.id} className="item-card">
                    <div className="item-image">👕</div>
                    <div className="item-info">
                      <h3>{item.title}</h3>
                      <p>Size: {item.size} | Condition: {item.condition}</p>
                      <p className="item-owner">by {item.uploader}</p>
                      <Link to={`/item/${item.id}`} className="btn-exchange">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
