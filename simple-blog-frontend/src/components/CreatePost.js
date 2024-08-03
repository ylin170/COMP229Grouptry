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

    return (
        <div>
            <h1>Create Post</h1>
            {showMessage && <p>{message}</p>}
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    name="title" 
                    value={formData.title} 
                    onChange={onChange} 
                    placeholder="Title" 
                    required 
                />
                <textarea 
                    name="content" 
                    value={formData.content} 
                    onChange={onChange} 
                    placeholder="Content" 
                    required 
                />
                <button type="submit">Create Post</button>
            </form>
        </div>
    );
};

export default CreatePost;
