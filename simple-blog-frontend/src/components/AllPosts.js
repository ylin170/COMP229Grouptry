import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCommentAlt, FaEdit, FaTrashAlt } from 'react-icons/fa';

const AllPosts = () => {
  const [posts, setPosts] = useState([]); // Initialize posts as an empty array
  const [commentContent, setCommentContent] = useState({});
  const [editCommentId, setEditCommentId] = useState(null); // Track editing state by comment ID
  const [editPostId, setEditPostId] = useState(null); // For tracking the post being edited
  const [postFormData, setPostFormData] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/posts');
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };

    fetchPosts();
  }, []);

  const handleCommentChange = (e, postId) => {
    setCommentContent({ ...commentContent, [postId]: e.target.value });
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const commentData = { content: commentContent[postId] };
      let res;

      if (editCommentId) {
        // If we're editing an existing comment
        res = await axios.put(`http://localhost:5000/api/comments/${editCommentId}`, commentData, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Clear edit state after updating
        setEditCommentId(null);
      } else {
        // If we're adding a new comment
        res = await axios.post(`http://localhost:5000/api/comments/${postId}`, commentData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      // Update the comments for the specific post
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId
            ? { 
                ...post, 
                comments: post.comments ? 
                  post.comments.map(comment => 
                    comment._id === editCommentId ? res.data : comment
                  ).concat(!editCommentId ? [res.data] : []) : 
                  [res.data]
              }
            : post
        )
      );

      // Clear the comment input field
      setCommentContent({ ...commentContent, [postId]: '' });
    } catch (err) {
      console.error('Error adding comment:', err);
      alert('Error adding comment');
    }
  };

  const handleEditComment = (commentId, content) => {
    setEditCommentId(commentId);
    setCommentContent({ ...commentContent, [editCommentId]: content });
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Update the comments for the specific post
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId
            ? { ...post, comments: post.comments.filter(comment => comment._id !== commentId) }
            : post
        )
      );
    } catch (err) {
      console.error('Error deleting comment:', err);
      alert('Error deleting comment');
    }
  };

  const handlePostEdit = (postId, title, content) => {
    setEditPostId(postId);
    setPostFormData({ title, content });
  };

  const handlePostUpdate = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`http://localhost:5000/api/posts/${editPostId}`, postFormData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Update the specific post in the posts list
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === editPostId
            ? { ...post, title: res.data.title, content: res.data.content }
            : post
        )
      );

      // Clear the edit post state
      setEditPostId(null);
      setPostFormData({ title: '', content: '' });
    } catch (err) {
      console.error('Error updating post:', err);
      alert('Error updating post');
    }
  };

  const handlePostDelete = async postId => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Remove the post from the posts list
      setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
      alert('Error deleting post');
    }
  };

  const allPostsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundImage: 'url("/assets/signup-background.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    boxSizing: 'border-box'
  };

  const postsListStyle = {
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    maxWidth: '800px',
    width: '100%',
    color: '#333',
    listStyleType: 'none',
    marginBottom: '20px'
  };

  const postItemStyle = {
    margin: '20px 0',
    textAlign: 'left'
  };

  const commentListStyle = {
    marginTop: '10px',
    paddingLeft: '10px',
    paddingRight: '10px',
    background: '#f0f0f0',
    borderRadius: '5px'
  };

  const commentInputWrapperStyle = {
    position: 'relative',
    width: '100%'
  };

  const commentInputStyle = {
    width: '100%',
    padding: '10px 40px 10px 10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px'
  };

  const commentIconStyle = {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    color: '#ccc'
  };

  const commentButtonStyle = {
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer'
  };

  const commentActionsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '5px',
    fontSize: '0.9em',
    color: '#777'
  };

  return (
    <div style={allPostsContainerStyle}>
      <h1>All Posts</h1>
      {posts.slice().reverse().map(post => (
        <div key={post._id} style={postsListStyle}>
          <div style={postItemStyle}>
            <strong>{post.title}</strong>
            <p>{post.content}</p>
            <div style={commentListStyle}>
              {(post.comments && Array.isArray(post.comments)) && post.comments.map(comment => (
                <div key={comment._id}>
                  <FaCommentAlt style={{ marginRight: '5px' }} />
                  {comment.content}
                  {editCommentId !== comment._id && (
                    <div style={commentActionsStyle}>
                      <FaEdit onClick={() => handleEditComment(comment._id, comment.content)} style={{ cursor: 'pointer' }} />
                      <FaTrashAlt onClick={() => handleDeleteComment(post._id, comment._id)} style={{ cursor: 'pointer' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {editPostId === post._id ? (
              <form onSubmit={handlePostUpdate}>
                <input
                  type="text"
                  name="title"
                  value={postFormData.title}
                  onChange={e => setPostFormData({ ...postFormData, title: e.target.value })}
                  placeholder="Title"
                  required
                  style={commentInputStyle}
                />
                <input
                  type="text"
                  name="content"
                  value={postFormData.content}
                  onChange={e => setPostFormData({ ...postFormData, content: e.target.value })}
                  placeholder="Content"
                  required
                  style={commentInputStyle}
                />
                <button type="submit" style={commentButtonStyle}>
                  Update Post
                </button>
              </form>
            ) : (
              <>
                <FaEdit onClick={() => handlePostEdit(post._id, post.title, post.content)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                <FaTrashAlt onClick={() => handlePostDelete(post._id)} style={{ cursor: 'pointer' }} />
              </>
            )}
            <form onSubmit={e => handleCommentSubmit(e, post._id)}>
              <div style={commentInputWrapperStyle}>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentContent[post._id] || ''}
                  onChange={e => handleCommentChange(e, post._id)}
                  style={commentInputStyle}
                />
                <FaCommentAlt style={commentIconStyle} />
              </div>
              <button type="submit" style={commentButtonStyle}>
                {editCommentId ? 'Update' : 'Post'}
              </button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllPosts;
