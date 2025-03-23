import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles.css';

function Product() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        if (id) {
          const selectedProduct = data.find(p => p._id === id);
          setProduct(selectedProduct);
        }
      });
  }, [id]);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart');
  };

  if (id && product) {
    // If viewing a single product
    return (
      <div className="product-details">
        <img src={product.image} alt={product.name} className="product-image" />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p><strong>Price:</strong> ₹{product.price}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <button className="button" onClick={() => addToCart(product)}>Add to Cart</button>
        <Link to="/product">
          <button className="button">Back to Products</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Products</h2>
      <ul className="product-list">
        {products.map(product => (
          <li key={product._id} className="product-item">
            <Link to={`/product/${product._id}`} className="product-link">
              <img src={product.image} alt={product.name} className="product-image" />
              <p><strong>{product.name}</strong></p>
              <p>{product.description}</p>
              <p>₹{product.price}</p>
            </Link>
            <button className="button" onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Product;
