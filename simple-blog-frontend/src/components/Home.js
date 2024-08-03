import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/signin';
  };

  return (
    <div>
      <h1>Blog Home</h1>
      <div>
        {/* Other content related to the app */}
        <p>Welcome to the Simple Blog app! Here you can:</p>
        <ul>
          <li>Create and share your own blog posts.</li>
          <li>Read and comment on posts from other users.</li>
          <li>Edit and manage your blog content.</li>
          <li>Stay connected with the community.</li>
        </ul>
      </div>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Home;
