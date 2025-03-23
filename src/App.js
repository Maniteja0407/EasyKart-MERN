import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Product from './pages/Product';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Home from './pages/Home';
import Admin from './pages/Admin';
import ProductDetails from './pages/ProductDetails';

import './styles.css';

// Protect routes that require authentication
function PrivateRoute({ element }) {
  return localStorage.getItem('token') ? element : <Navigate to="/signin" />;
}

// Restrict Admin Panel to a specific email (Replace with your actual email)
function AdminRoute({ element }) {
  const userEmail = localStorage.getItem('userEmail');
  return userEmail === 'admin@example.com' ? element : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product" element={<Product />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<AdminRoute element={<Admin />} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
