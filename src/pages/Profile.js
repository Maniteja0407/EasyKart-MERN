import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.log('No token found. Redirecting to Signin.');
      navigate('/signin');
      return;
    }

    fetch('http://localhost:5000/profile', {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${token}`,  // Use Bearer format for Authorization header
        }
      })
      
    .then(response => response.json())
    .then(data => {
      console.log('User data:', data);
      if (data.user) {
        setUser(data.user);
      } else {
        console.log('No user found in response:', data);
      }
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching user:', error);
      localStorage.removeItem('token');
      navigate('/signin');
    });
  }, [navigate]);

  if (loading) return <h2>Loading user information...</h2>;
  if (!user) return <h2>Error fetching user information</h2>;

  return (
    <div className="container">
      <h2>Profile Page</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
}

export default Profile;
