// simple-blog-frontend/src/components/GetComments.js

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

  return (
    <div>
      <h1>Get Comments</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={postId} onChange={e => setPostId(e.target.value)} placeholder="Post ID" required />
        <button type="submit">Get Comments</button>
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
