import React, { useState } from 'react';
import axios from 'axios';

const DeletePost = () => {
  const [postId, setPostId] = useState('');
  const [message, setMessage] = useState('');

  const onChange = e => setPostId(e.target.value);

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessage('Post deleted successfully');
    } catch (err) {
      setMessage(err.response?.data?.message || 'An error occurred');
    }
  };

  const deletePostContainerStyle = {
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
    <div style={deletePostContainerStyle}>
      <h1>Delete Post</h1>
      {message && <p>{message}</p>}
      <form onSubmit={onSubmit} style={formStyle}>
        <input 
          type="text" 
          value={postId} 
          onChange={onChange} 
          placeholder="Post ID" 
          required 
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Delete Post</button>
      </form>
    </div>
  );
};

export default DeletePost;
