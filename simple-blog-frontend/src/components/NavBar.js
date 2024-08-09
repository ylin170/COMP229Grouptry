import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import the CSS file for styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/assets/logo.jpg" alt="Simple Blog Logo" className="logo" />
        <span className="app-name">Simple Blog</span>
      </div>
      <div className="navbar-center">
        <span className="navbar-tagline">Everyday New Blog</span>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/signin">Sign In</Link>
      </div>
    </nav>
  );
};

export default NavBar;
