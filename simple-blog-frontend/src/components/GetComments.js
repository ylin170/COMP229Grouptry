import React, { useState } from 'react';
import axios from 'axios';

const GetComments = () => {
  const [postId, setPostId] = useState('');
  const [comments, setComments] = useState([]);

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5000/api/comments/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const getCommentsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: 'url("/assets/signup-background.jpg")', // Use your background image here
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    boxSizing: 'border-box'
  };

  const formStyle = {
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    maxWidth: '400px',
    width: '100%',
    color: '#333'
  };

  const inputStyle = {
    width: 'calc(100% - 20px)',
    margin: '10px 0',
    padding: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem'
  };

  const buttonStyle = {
    width: '100%',
    padding: '15px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#9eafc2',
    color: 'white',
    fontSize: '1rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  };

  return (
    <div style={getCommentsContainerStyle}>
      <h1>Get Comments</h1>
      <form onSubmit={onSubmit} style={formStyle}>
        <input 
          type="text" 
          value={postId} 
          onChange={e => setPostId(e.target.value)} 
          placeholder="Post ID" 
          required 
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Get Comments</button>
      </form>
      <ul>
        {comments.map(comment => (
          <li key={comment._id}>{comment.content} (by {comment.author.username})</li>
        ))}
      </ul>
    </div>
  );
};

export default GetComments;
