import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            setMessage(res.data.message);
            alert(res.data.message); // Display the success message
            navigate('/'); // Redirect to home or dashboard
        } catch (err) {
            setMessage(err.response?.data?.message || 'An error occurred');
            console.error('Error during login:', err);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign In</h1>
            {message && <p>{message}</p>}
            <input type="text" name="username" value={formData.username} onChange={onChange} required />
            <input type="password" name="password" value={formData.password} onChange={onChange} required />
            <button type="submit">Sign In</button>
        </form>
    );
};

export default SignIn;
