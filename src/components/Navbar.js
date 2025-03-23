import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';
import logo from '../assets/logooss.png'; // Ensure you place your logo inside src/assets/

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userEmail = localStorage.getItem('userEmail'); // Retrieve the logged-in user's email
  const isAdmin = userEmail === 'admin@example.com'; // Replace with your actual admin email

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    navigate('/signin');
  };

  return (
    <nav className="navbar">
      {/* Website Logo - Clickable to go Home */}
      <Link to="/" className="nav-logo">
        <img src={logo} alt="EasyKart Logo" className="logo" />
      </Link>

      <Link to="/" className="nav-link">Home</Link>
      <Link to="/product" className="nav-link">Products</Link>
      {token ? (
        <>
          <Link to="/cart" className="nav-link">Cart</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          {isAdmin && <Link to="/admin" className="nav-link">Admin Panel</Link>} {/* Only for admin */}
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/signin" className="nav-link">Sign In</Link>
          <Link to="/signup" className="nav-link">Sign Up</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
