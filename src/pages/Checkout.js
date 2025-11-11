import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaMapMarkerAlt, FaPhone, FaCreditCard } from 'react-icons/fa';
import './Checkout.css';

const Checkout = ({ cartItems, onOrderComplete }) => {
  console.log('Checkout component - cartItems:', cartItems);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [buyerDetails, setBuyerDetails] = useState({
    name: '',
    address: '',
    phone: '',
    email: ''
  });

  // No backend calls in sample app; payment flow is mocked.

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { name, address, phone } = buyerDetails;
    
    if (!name.trim()) {
      toast.error('Please enter your name');
      return false;
    }
    
    if (!address.trim()) {
      toast.error('Please enter your address');
      return false;
    }
    
    if (!phone.trim()) {
      toast.error('Please enter your phone number');
      return false;
    }
    
    if (!/^[0-9]{10}$/.test(phone.replace(/\s/g, ''))) {
      toast.error('Please enter a valid 10-digit phone number');
      return false;
    }
    
    return true;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // In the mock flow we skip contacting payment provider and simulate success after a short delay.
      await new Promise(res => setTimeout(res, 800));
      const fakeOrder = {
        id: `order_${Date.now()}`,
        amount: getTotalAmount(),
        currency: 'INR',
        items: cartItems,
        buyer: buyerDetails
      };
      toast.success('Payment successful (mock)');
      onOrderComplete(fakeOrder);
      navigate('/order-success');
      
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>No items to checkout</h2>
        <button onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="checkout-form">
          <h2>Buyer Details</h2>
          
          <div className="form-group">
            <label htmlFor="name">
              <FaUser /> Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={buyerDetails.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">
              <FaMapMarkerAlt /> Address *
            </label>
            <textarea
              id="address"
              name="address"
              value={buyerDetails.address}
              onChange={handleInputChange}
              placeholder="Enter your complete address"
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              <FaPhone /> Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={buyerDetails.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <FaUser /> Email (Optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={buyerDetails.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          
          <div className="order-items">
            {cartItems.map(item => (
              <div key={item._id} className="order-item">
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                  <p className="item-price">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="order-total">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>₹{getTotalAmount().toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="total-row total-final">
              <span>Total:</span>
              <span>₹{getTotalAmount().toFixed(2)}</span>
            </div>
          </div>
          
          <button 
            className="pay-now-btn"
            onClick={handlePayment}
            disabled={loading}
          >
            <FaCreditCard />
            {loading ? 'Processing...' : `Pay ₹${getTotalAmount().toFixed(2)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;