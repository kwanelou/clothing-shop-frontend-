import React, { useState } from 'react';

const Checkout = () => {
  const cart =
    JSON.parse(localStorage.getItem('cart')) || [];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address
    ) {
      alert('Please fill all fields.');
      return;
    }

    const confirmOrder = window.confirm(
      'Do you want to place this order?'
    );

    if (!confirmOrder) return;

    try {
      const res = await fetch(
        'http://127.0.0.1:8000/api/checkout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customer: formData,
            items: cart,
            total: totalPrice,
            payment_method: 'Cash on Delivery',
          }),
        }
      );

      const result = await res.json();

      if (result.status) {
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event('cartUpdated'));

        alert('Order placed successfully!');

        window.location.href = '/';
      } else {
        alert(result.message || 'Order failed.');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to place order');
    }
  };

  return (
    <div className="container py-5 bg-primary mt-5">
      <h2 className="mb-4 fw-bold text-center">Checkout your order</h2>

      <div className="row">
        <div className="col-md-6">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="form-control mb-3"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="form-control mb-3"
            value={formData.phone}
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Delivery Address"
            className="form-control mb-3"
            value={formData.address}
            onChange={handleChange}
          />

        </div>

        <div className="col-md-6">
          <h4>Order Summary</h4>

          {cart.map((item) => (
            <div
              key={`${item.id}-${item.category}`}
              className="d-flex justify-content-between mb-2"
            >
              <div className='text-checkout'>
                 <p>
                {item.title} x {item.quantity}
              </p>
              <p>
                ${item.price * item.quantity}
              </p>

              </div>
             
            </div>
          ))}

          <hr />

          <h5>Total: ${totalPrice}</h5>
          <hr/>

          <p className="text-muted text-bold-5">
            Payment Method: Cash on Delivery
          </p>

          <button
            className="btn btn-primary w-100 mt-3 bg-secondary"
            onClick={placeOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;