// simple-blog-frontend/src/components/AllPosts.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/api/posts');
      setPosts(res.data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>All Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            {post.title} (ID: {post._id}) - {post.content}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllPosts;
