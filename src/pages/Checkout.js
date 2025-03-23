// Checkout.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function Checkout() {
  const navigate = useNavigate();
  const [checkoutProduct, setCheckoutProduct] = useState(null);

  useEffect(() => {
    const product = JSON.parse(localStorage.getItem('checkoutProduct'));
    setCheckoutProduct(product);
  }, []);

  const handlePayment = () => {
    localStorage.removeItem('checkoutProduct');
    localStorage.removeItem('cart');
    alert('Payment successful! Order placed.');
    navigate('/');
  };

  if (!checkoutProduct) return <h2>No product selected for checkout</h2>;

  return (
    <div className="container">
      <h2>Checkout Page</h2>
      <div className="checkout-product">
        <img src={checkoutProduct.image} alt={checkoutProduct.name} className="checkout-image" />
        <h3>{checkoutProduct.name}</h3>
        <p>Price: ₹{checkoutProduct.price}</p>
      </div>
      <button className="button" onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default Checkout;