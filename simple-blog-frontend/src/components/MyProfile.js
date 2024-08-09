import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('/api/users/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setUser(res.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'An error occurred');
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const profileContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: 'url("/assets/signup-background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        boxSizing: 'border-box'
    };

    const profileInfoStyle = {
        background: 'rgba(255, 255, 255, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
        maxWidth: '400px',
        width: '100%',
        color: '#333',
    };

    const profilePictureStyle = {
        borderRadius: '50%',
        width: '100px',
        height: '100px',
        marginBottom: '20px',
    };

    if (loading) return <p style={{ color: 'white' }}>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div style={profileContainerStyle}>
            <form style={profileInfoStyle}>
                <h1 style={{ color: '#333', marginBottom: '20px', textAlign: 'center' }}>My Profile</h1>
                {user && (
                    <>
                        <img 
                            src={user.profilePicture || "/assets/default-profile.png"} 
                            alt="Profile" 
                            style={profilePictureStyle} 
                        />
                        <p><strong>Username:</strong> {user.username}</p>
                    </>
                )}
            </form>
        </div>
    );
};

export default MyProfile;
