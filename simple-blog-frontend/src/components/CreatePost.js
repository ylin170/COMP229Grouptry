import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
    const [formData, setFormData] = useState({ title: '', content: '' });
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            await axios.post('/api/posts', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Post created successfully');
            setShowMessage(true);
            setFormData({ title: '', content: '' });
            setTimeout(() => {
                setShowMessage(false);
            }, 3000); // Hide message after 3 seconds
        } catch (err) {
            setMessage('Error creating post');
            setShowMessage(true);
            setTimeout(() => {
                setShowMessage(false);
            }, 3000); // Hide message after 3 seconds
            console.error('Error creating post:', err);
        }
    };

    const createPostContainerStyle = {
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
        <div style={createPostContainerStyle}>
            <h1>Create Post</h1>
            {showMessage && <p>{message}</p>}
            <form onSubmit={onSubmit} style={formStyle}>
                <input 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={onChange} 
                    placeholder="Title" 
                    required 
                    style={inputStyle}
                />
                <textarea 
                    name="content" 
                    value={formData.content} 
                    onChange={onChange} 
                    placeholder="Content" 
                    required 
                    style={inputStyle}
                />
                <button type="submit" style={buttonStyle}>Create Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
