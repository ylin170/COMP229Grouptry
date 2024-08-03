// simple-blog-frontend/src/components/AddComment.js

import React, { useState } from 'react';
import axios from 'axios';

const AddComment = () => {
  const [formData, setFormData] = useState({ postId: '', content: '' });
  const [message, setMessage] = useState('');

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`http://localhost:5000/api/comments/${formData.postId}`, 
      { content: formData.content }, 
      {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('Comment added successfully');
    } catch (err) {
      setMessage(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Add Comment</h1>
      {message && <p>{message}</p>}
      <input type="text" name="postId" value={formData.postId} onChange={onChange} placeholder="Post ID" required />
      <input type="text" name="content" value={formData.content} onChange={onChange} placeholder="Comment" required />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default AddComment;
