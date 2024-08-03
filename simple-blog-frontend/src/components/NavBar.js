// simple-blog-frontend/src/components/NavBar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import the CSS file for styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/assets/logo.jpg" alt="Simple Blog Logo" className="logo" />
        <span>Simple Blog</span>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/all-posts">All Posts</Link>
        <Link to="/myprofile">My Profile</Link>
        <Link to="/create-post">Create Post</Link>
        <Link to="/add-comment">Add Comment</Link>
        <Link to="/get-comments">Get Comments</Link>
        <Link to="/update-post">Update Post</Link>
        <Link to="/delete-post">Delete Post</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/signin">Sign In</Link>
      </div>
    </nav>
  );
};

export default NavBar;
