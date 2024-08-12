import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file for other styles

const Home = () => {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username'); // Assume username is stored after login

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/signin';
  };

  const backgroundImageStyle = {
    position: 'relative',
    minHeight: '100vh', // Ensure it always covers the viewport height
    width: '100vw', // Ensure the image covers the full width
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'flex-start', // Align content to the top
    backgroundImage: 'url("/assets/background.jpg")', // Set background image here
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat', // Prevent the image from repeating
    padding: '30px', // Add padding for content spacing
    boxSizing: 'border-box'
  };

  return (
    <div className="home-container" style={backgroundImageStyle}>
      <div className="options-grid">
        <Link to="/create-post" className="option">Create Post</Link>
        <Link to="/all-posts" className="option">All Posts</Link>

{/* 
  <Link to="/add-comment" className="option">Add Comment</Link>
  <Link to="/get-comments" className="option">Get Comments</Link>
  <Link to="/update-post" className="option">Update Post</Link>
  <Link to="/delete-post" className="option delete">Delete Post</Link>
*/}
        <button className="signout-button" onClick={handleSignOut}>Sign Out</button>
      </div>
      <div className="welcome-message">
      </div>
    </div>
  );
};

export default Home;
