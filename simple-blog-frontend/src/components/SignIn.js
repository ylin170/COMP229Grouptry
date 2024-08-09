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

    // Style object for the signup container
    const signinContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: 'url("/assets/signup-background.jpg")', // Set your background image here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div style={signinContainerStyle} className="signin-container">
            <form onSubmit={onSubmit} style={{ background: 'rgba(255, 255, 255, 0.0)' }}>
                <h1 style={{ color: '#333', fontFamily: 'Merriweather', marginBottom: '20px', textAlign: 'center' }}>Sign In</h1>
                {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={onChange}
                    required
                    placeholder="Username"
                    style={{
                        width: 'calc(100% - 20px)',
                        margin: '10px 0',
                        padding: '15px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        fontSize: '1rem',
                    }}
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={onChange}
                    required
                    placeholder="Password"
                    style={{
                        width: 'calc(100% - 20px)',
                        margin: '10px 0',
                        padding: '15px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        fontSize: '1rem',
                    }}
                />
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '15px',
                        borderRadius: '5px',
                        border: 'none',
                        backgroundColor: '#9eafc2', // Background color to match the signup page
                        color: 'white',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                    }}
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default SignIn;
