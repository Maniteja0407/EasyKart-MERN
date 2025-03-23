import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart');
  };

  const categories = ['All', ...new Set(products.map(product => product.category))];
  const filteredProducts = selectedCategory === 'All' ? products : products.filter(product => product.category === selectedCategory);

  return (
    <div className="container">
      <h2>Home Page</h2>
      <div className="category-filter">
        <label>Filter by Category:</label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
      {categories.map(category => (
        <div key={category} className="category-section">
          <h3>{category}</h3>
          <div className="product-scroll">
            {filteredProducts.filter(product => product.category === category).map(product => (
              <div key={product._id} className="product-card" onClick={() => navigate(`/product/${product._id}`)}>
                <img src={product.image} alt={product.name} className="product-image" />
                <p><strong>{product.name}</strong></p>
                <p>{product.description}</p>
                <p>₹{product.price}</p>
                <button className="button" onClick={(e) => { e.stopPropagation(); addToCart(product); }}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
