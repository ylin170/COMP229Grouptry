// simple-blog-frontend/src/components/UpdatePost.js

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

  return (
    <form onSubmit={onSubmit}>
      <h1>Update Post</h1>
      {message && <p>{message}</p>}
      <input type="text" name="postId" value={formData.postId} onChange={onChange} placeholder="Post ID" required />
      <input type="text" name="title" value={formData.title} onChange={onChange} placeholder="Title" required />
      <input type="text" name="content" value={formData.content} onChange={onChange} placeholder="Content" required />
      <button type="submit">Update Post</button>
    </form>
  );
};

export default UpdatePost;
