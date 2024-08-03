import React, { useState } from 'react';
import axios from 'axios';

const SignUp = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/register', formData);
            localStorage.setItem('token', res.data.token);
            setMessage(res.data.message);
            window.location = "/"; // Redirect to home or dashboard
        } catch (err) {
            setMessage(err.response.data.message);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            {message && <p>{message}</p>}
            <input type="text" name="username" value={formData.username} onChange={onChange} required />
            <input type="password" name="password" value={formData.password} onChange={onChange} required />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUp;
