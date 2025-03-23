import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert('Login Successful!');
      localStorage.setItem('token', data.token);  // Store auth token
      localStorage.setItem('userEmail', email);   // Store user email for admin check
      navigate('/profile'); // Redirect to Profile Page
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="button">Sign In</button>
      </form>
    </div>
  );
}

export default Signin;
