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

  return (
    <form onSubmit={onSubmit}>
      <h1>Delete Post</h1>
      {message && <p>{message}</p>}
      <input type="text" value={postId} onChange={onChange} placeholder="Post ID" required />
      <button type="submit">Delete Post</button>
    </form>
  );
};

export default DeletePost;
