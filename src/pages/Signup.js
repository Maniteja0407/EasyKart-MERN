import React, { useState } from 'react';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await response.json();
    alert(data.message);
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" required className="input" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" required className="input" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="button">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
