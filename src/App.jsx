import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import AddItem from './components/AddItem';
import Detail from './components/Detail';
import Admin from './components/Admin';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Blue Denim Jacket",
      description: "A classic vintage denim jacket in excellent condition.",
      category: "Outerwear",
      type: "vintage",
      size: "M",
      condition: "Excellent",
      tags: ["vintage", "denim", "jacket"],
      uploader: "Sarah Johnson",
      uploaderEmail: "sarah@example.com",
      isAvailable: true,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "Summer Floral Dress",
      description: "Beautiful floral dress perfect for summer occasions.",
      category: "Dresses",
      type: "casual",
      size: "S",
      condition: "Good",
      tags: ["floral", "summer", "dress"],
      uploader: "Emma Davis",
      uploaderEmail: "emma@example.com",
      isAvailable: true,
      createdAt: "2024-01-14"
    }
  ]);

  const handleAuthStateChange = (isAuthenticated) => {
    if (isAuthenticated) {
      setUser({ email: 'user@example.com' });
    } else {
      setUser(null);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const addNewItem = (newItem) => {
    const itemToAdd = {
      ...newItem,
      id: Date.now(),
      uploader: user?.email || 'Anonymous',
      uploaderEmail: user?.email || 'anonymous@example.com',
      isAvailable: true,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setItems(prev => [itemToAdd, ...prev]);
  };

  const getUserItems = () => {
    return items.filter(item => item.uploaderEmail === user?.email);
  };

  const getCommunityItems = () => {
    return items.filter(item => item.uploaderEmail !== user?.email);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={user ? <Navigate to="/dashboard" /> : <Landing />} 
          />
          <Route 
            path="/auth" 
            element={
              user ? 
              <Navigate to="/dashboard" /> : 
              <Auth onAuthStateChange={handleAuthStateChange} />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              user ? 
              <Dashboard 
                user={user} 
                onLogout={handleLogout}
                userItems={getUserItems()}
                communityItems={getCommunityItems()}
              /> : 
              <Navigate to="/auth" />
            } 
          />
          <Route 
            path="/add-item" 
            element={
              user ? 
              <AddItem onAddItem={addNewItem} /> : 
              <Navigate to="/auth" />
            } 
          />
          <Route 
            path="/item/:id" 
            element={
              user ? 
              <Detail items={items} /> : 
              <Navigate to="/auth" />
            } 
          />
          <Route 
            path="/admin" 
            element={
              user ? 
              <Admin items={items} setItems={setItems} /> : 
              <Navigate to="/auth" />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
