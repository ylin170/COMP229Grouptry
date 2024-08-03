// simple-blog-frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import NavBar from './components/NavBar';
import MyProfile from './components/MyProfile';
import CreatePost from './components/CreatePost';
import AllPosts from './components/AllPosts'; // New component
import AddComment from './components/AddComment'; // New component
import GetComments from './components/GetComments'; // New component
import UpdatePost from './components/UpdatePost'; // New component
import DeletePost from './components/DeletePost'; // New component
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/myprofile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
        <Route path="/create-post" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        <Route path="/all-posts" element={<ProtectedRoute><AllPosts /></ProtectedRoute>} /> {/* New route */}
        <Route path="/add-comment" element={<ProtectedRoute><AddComment /></ProtectedRoute>} /> {/* New route */}
        <Route path="/get-comments" element={<ProtectedRoute><GetComments /></ProtectedRoute>} /> {/* New route */}
        <Route path="/update-post" element={<ProtectedRoute><UpdatePost /></ProtectedRoute>} /> {/* New route */}
        <Route path="/delete-post" element={<ProtectedRoute><DeletePost /></ProtectedRoute>} /> {/* New route */}
      </Routes>
    </Router>
  );
};

export default App;
