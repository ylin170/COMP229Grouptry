import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; // Import the CSS file for other styling

const SignUp = () => {
  const [formData, setFormData] = useState({ username: '', password: '', email: '', bio: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      setMessage('User registered successfully');
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  const signupContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: 'url("/assets/signup-background.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div style={signupContainerStyle} className="signup-container">
      <form onSubmit={onSubmit} style={{ background: 'rgba(255, 255, 255, 0.0)' }}>
        <h1 style={{ color: '#333', fontFamily: 'Merriweather', marginBottom: '20px', textAlign: 'center' }}>Sign Up</h1>
        <p style={{ color: '#666', fontSize: '1rem', marginBottom: '20px', textAlign: 'center' }}>Personal Info</p>
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
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#9eafc2',
              color: 'white',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
