import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredItems = [
    {
      id: 1,
      name: "Vintage Denim Jacket",
      category: "Outerwear",
      condition: "Excellent",
      image: "🧥"
    },
    {
      id: 2,
      name: "Summer Floral Dress",
      category: "Dresses",
      condition: "Good",
      image: "👗"
    },
    {
      id: 3,
      name: "Classic White Sneakers",
      category: "Shoes",
      condition: "Excellent",
      image: "👟"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
  };

  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="hero-section">
          <h1 className="hero-title">
            Welcome to <span className="brand">ReWear</span>
          </h1>
          <p className="hero-subtitle">
            Join the sustainable fashion revolution. Exchange, share, and discover 
            pre-loved clothing while reducing textile waste.
          </p>
          
          <div className="cta-buttons">
            <Link to="/auth" className="cta-primary">
              Start Swapping
            </Link>
            <Link to="/auth" className="cta-secondary">
              Browse Items
            </Link>
            <Link to="/auth" className="cta-secondary">
              List an Item
            </Link>
          </div>
        </div>

        <div className="featured-section">
          <h2>Featured Items</h2>
          <div className="carousel-container">
            <button className="carousel-btn prev" onClick={prevSlide}>
              ‹
            </button>
            <div className="carousel">
              <div className="carousel-item">
                <div className="item-image">{featuredItems[currentSlide].image}</div>
                <h3>{featuredItems[currentSlide].name}</h3>
                <p>{featuredItems[currentSlide].category} • {featuredItems[currentSlide].condition}</p>
              </div>
            </div>
            <button className="carousel-btn next" onClick={nextSlide}>
              ›
            </button>
          </div>
          <div className="carousel-dots">
            {featuredItems.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>

        <div className="stats-section">
          <div className="stat">
            <h3>10,000+</h3>
            <p>Items Exchanged</p>
          </div>
          <div className="stat">
            <h3>5,000+</h3>
            <p>Active Users</p>
          </div>
          <div className="stat">
            <h3>2,500kg</h3>
            <p>Waste Reduced</p>
          </div>
        </div>
      </div>

      <div className="floating-elements">
        <div className="floating-item" style={{ '--delay': '0s' }}>👕</div>
        <div className="floating-item" style={{ '--delay': '2s' }}>👖</div>
        <div className="floating-item" style={{ '--delay': '4s' }}>👗</div>
        <div className="floating-item" style={{ '--delay': '6s' }}>🧥</div>
      </div>
    </div>
  );
};

export default Landing;
