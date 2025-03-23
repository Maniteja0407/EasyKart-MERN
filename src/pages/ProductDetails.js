// ProductDetails.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles.css';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then(response => response.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });
  }, [id]);

  const addReview = () => {
    if (reviewText.trim() !== '') {
      const newReview = { text: reviewText, rating };
      setReviews([...reviews, newReview]);
      setReviewText('');
      setRating(1);
    }
  };

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart');
  };

  const handleBuyNow = () => {
    localStorage.setItem('checkoutProduct', JSON.stringify(product));
    navigate('/checkout');
  };

  if (loading) return <h2>Loading...</h2>;
  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="product-details-container">
      <img src={product.image} alt={product.name} className="product-details-image" />
      <div className="product-info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h3>₹{product.price}</h3>
        <p><strong>Category:</strong> {product.category}</p>
        <button className="button" onClick={addToCart}>Add to Cart</button>
        <button className="button buy-now" onClick={handleBuyNow}>Buy Now</button>
      </div>
      
      <div className="reviews-section">
        <h3>Reviews</h3>
        {reviews.map((rev, index) => (
          <p key={index}><strong>Rating:</strong> {rev.rating}/5 - {rev.text}</p>
        ))}
        <input type="text" value={reviewText} onChange={(e) => setReviewText(e.target.value)} placeholder="Write a review..." />
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num} Star</option>
          ))}
        </select>
        <button onClick={addReview}>Submit Review</button>
      </div>
    </div>
  );
}

export default ProductDetails;