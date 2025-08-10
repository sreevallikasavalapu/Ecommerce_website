import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert(`Login failed: ${errorText}`);
        return;
      }

      const data = await response.json();
      setUser(data);
      localStorage.setItem('username', data.username); // optional: persist
      navigate('/');
    } catch (error) {
      alert('An error occurred during login.');
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        backgroundImage: `url('https://capturly.com/blog/wp-content/uploads/2018/01/eCommerce-website-search-customer-experience.jpg')`, // Put image in `public/images/`
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Left Welcome Section */}
      <div style={{ flex: 1, padding: '100px', color: '#000' }}>
        <h1>      🛒 Vistora       </h1>
        <h1 style={{ fontSize: '2.5rem' }}>✨ Style, Tech, Home & More</h1>
        <p style={{ marginTop: '30px', fontWeight: 'bold', fontSize: '1.1rem' }}>
             Heyy, <br />
          <span style={{ fontWeight: 'normal' }}>
            Your favorite brands, just a click away. 
          </span>
        </p>
      </div>

      {/* Right Login Card */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: '#f9c7a4',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
            width: '320px',
            textAlign: 'center',
          }}
        >
          <h2 style={{ marginBottom: '20px' }}>LOGIN</h2>

          <div style={{ textAlign: 'left', marginBottom: '15px' }}>
            <label>Username:</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                marginTop: '5px',
              }}
            />
          </div>

          <div style={{ textAlign: 'left', marginBottom: '20px' }}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                marginTop: '5px',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: '#3b60ab',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              width: '100%',
              marginBottom: '10px',
            }}
          >
            Login
          </button>

          <p style={{ marginTop: '10px' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#0645AD' }}>
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
