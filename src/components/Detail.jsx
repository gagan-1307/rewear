import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Detail.css';

const Detail = ({ items }) => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showSwapModal, setShowSwapModal] = useState(false);

  // Find the item by ID
  const item = items.find(item => item.id === parseInt(id)) || {
    id: 1,
    title: "Vintage Denim Jacket",
    description: "A classic vintage denim jacket in excellent condition. Perfect for layering in any season. Features a comfortable fit and authentic vintage styling.",
    category: "Outerwear",
    size: "M",
    condition: "Excellent",
    tags: ["vintage", "denim", "jacket", "casual"],
    images: ["🧥", "👕", "👖"],
    uploader: "Sarah Johnson",
    rating: 4.8,
    itemsUploaded: 15,
    pointsRequired: 150,
    isAvailable: true,
    createdAt: "2024-01-15"
  };

  const handleSwapRequest = () => {
    setShowSwapModal(true);
  };

  const handleRedeemPoints = () => {
    alert('Item redeemed with points!');
  };

  return (
    <div className="detail-container">
      <div className="detail-content">
        <div className="detail-header">
          <Link to="/dashboard" className="back-btn">
            ← Back to Dashboard
          </Link>
          <h1>{item.title}</h1>
        </div>

        <div className="detail-main">
          <div className="image-section">
            <div className="main-image">
              {item.images && item.images[selectedImage] ? item.images[selectedImage] : "👕"}
            </div>
            <div className="image-gallery">
              {(item.images || ["👕", "👖", "🧥"]).map((image, index) => (
                <button
                  key={index}
                  className={`gallery-thumb ${index === selectedImage ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  {image}
                </button>
              ))}
            </div>
          </div>

          <div className="item-info-section">
            <div className="item-header">
              <h2>{item.title}</h2>
              <span className={`availability ${item.isAvailable ? 'available' : 'unavailable'}`}>
                {item.isAvailable ? 'Available' : 'Unavailable'}
              </span>
            </div>

            <div className="item-meta">
              <div className="meta-item">
                <span className="label">Category:</span>
                <span className="value">{item.category}</span>
              </div>
              <div className="meta-item">
                <span className="label">Size:</span>
                <span className="value">{item.size}</span>
              </div>
              <div className="meta-item">
                <span className="label">Condition:</span>
                <span className="value">{item.condition}</span>
              </div>
              <div className="meta-item">
                <span className="label">Type:</span>
                <span className="value">{item.type}</span>
              </div>
            </div>

            <div className="item-description">
              <h3>Description</h3>
              <p>{item.description}</p>
            </div>

            {item.tags && item.tags.length > 0 && (
              <div className="item-tags">
                <h3>Tags</h3>
                <div className="tags">
                  {item.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="uploader-info">
              <h3>Uploaded by</h3>
              <div className="uploader-card">
                <div className="uploader-avatar">👤</div>
                <div className="uploader-details">
                  <h4>{item.uploader}</h4>
                  <p>Uploaded on: {item.createdAt}</p>
                </div>
              </div>
            </div>

            <div className="action-buttons">
              <button 
                className="btn-swap"
                onClick={handleSwapRequest}
                disabled={!item.isAvailable}
              >
                Swap Request
              </button>
              <button 
                className="btn-redeem"
                onClick={handleRedeemPoints}
                disabled={!item.isAvailable}
              >
                Redeem via Points (150)
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSwapModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Request Swap</h3>
            <p>Select an item to swap with "{item.title}"</p>
            <div className="swap-items">
              <div className="swap-item">
                <span>👕 Your Item</span>
                <select className="swap-select">
                  <option>Select your item...</option>
                  <option>Blue T-Shirt</option>
                  <option>Black Jeans</option>
                  <option>Red Sweater</option>
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button 
                className="btn-cancel"
                onClick={() => setShowSwapModal(false)}
              >
                Cancel
              </button>
              <button className="btn-confirm">
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
