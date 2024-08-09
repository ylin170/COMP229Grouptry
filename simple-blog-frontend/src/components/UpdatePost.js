import React, { useState } from 'react';
import axios from 'axios';

const UpdatePost = () => {
  const [formData, setFormData] = useState({ postId: '', title: '', content: '' });
  const [message, setMessage] = useState('');

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`http://localhost:5000/api/posts/${formData.postId}`, 
      { title: formData.title, content: formData.content }, 
      {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Post updated successfully');
    } catch (err) {
      setMessage(err.response?.data?.message || 'An error occurred');
    }
  };

  const updatePostContainerStyle = {
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
    <div style={updatePostContainerStyle}>
      <h1>Update Post</h1>
      {message && <p>{message}</p>}
      <form onSubmit={onSubmit} style={formStyle}>
        <input 
          type="text" 
          name="postId" 
          value={formData.postId} 
          onChange={onChange} 
          placeholder="Post ID" 
          required 
          style={inputStyle}
        />
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={onChange} 
          placeholder="Title" 
          required 
          style={inputStyle}
        />
        <input 
          type="text" 
          name="content" 
          value={formData.content} 
          onChange={onChange} 
          placeholder="Content" 
          required 
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Update Post</button>
      </form>
    </div>
  );
};

export default UpdatePost;
