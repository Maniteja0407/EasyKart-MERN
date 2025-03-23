// src/pages/AdminPanel.js
import React, { useState, useEffect } from 'react';
import '../styles.css';

function AdminPanel() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const categories = ['Electronics', 'Clothing', 'Home Appliances', 'Beauty', 'Toys', 'Groceries'];

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);
  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
      setDescription(editingProduct.description);
      setImage(editingProduct.image);
      setCategory(editingProduct.category);
    }
  }, [editingProduct]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = { name, price, description, image, category };
    console.log('Updating Product:', editingProduct);

    let response;
    if (editingProduct) {
      response = await fetch(`http://localhost:5000/products/${editingProduct._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
    } else {
      response = await fetch('http://localhost:5000/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
    }
  
    if (response.ok) {
      alert(editingProduct ? 'Product updated successfully' : 'Product added successfully');
      
      // Fetch updated product list
      const updatedProducts = await fetch('http://localhost:5000/products').then(res => res.json());
      setProducts(updatedProducts);
  
      // Reset form
      setEditingProduct(null);
      setName('');
      setPrice('');
      setDescription('');
      setImage('');
      setCategory('Electronics');
    } else {
      alert('Failed to update product');
    }
  };
  
  

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/products/${id}`, { method: 'DELETE' });
    alert('Product deleted successfully');
    window.location.reload();
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} required />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit" className="button">{editingProduct ? 'Update Product' : 'Add Product'}</button>
      </form>
      <h3>Product List</h3>
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - ${product.price}
            <button onClick={() => {
  setEditingProduct(product);
  setName(product.name);
  setPrice(product.price);
  setDescription(product.description);
  setImage(product.image);
  setCategory(product.category);
}}>Edit</button>

            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;