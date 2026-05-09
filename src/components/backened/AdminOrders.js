import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminOrders = () => {
  const [checkout, setCheckout] = useState([]);
  const navigate = useNavigate();

  // GET TOKEN
  const getToken = () => {
    const userinfo = JSON.parse(localStorage.getItem('userinfo'));
    return userinfo?.token;
  };

  // FETCH ORDERS
  const fetchCheckout = async () => {
    try {
      const token = getToken();

      const res = await fetch('http://127.0.0.1:8000/api/checkout', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();

      if (result.status) {
        setCheckout(result.orders || []);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCheckout();
  }, []);

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      const token = getToken();

      const res = await fetch(
        `http://127.0.0.1:8000/api/checkout/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const result = await res.json();

      if (result.status) {
        alert('Status updated');
        fetchCheckout();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // DELETE ORDER
  const deleteOrder = async (id) => {
    if (!window.confirm('Delete this order?')) return;

    try {
      const token = getToken();

      const res = await fetch(
        `http://127.0.0.1:8000/api/checkout/${id}`,
        {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await res.json();

      if (result.status) {
        alert('Order deleted');
        fetchCheckout();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container py-5">

      {/* HEADER WITH BACK BUTTON */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold mb-0">
          Admin Order Management
        </h2>

        <button
          className="btn btn-danger"
          onClick={() => navigate('/dashboard')}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* TABLE */}
      <div className="table-responsive">
        <table className="table table-bordered text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {checkout.length > 0 ? (
              checkout.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer_name}</td>
                  <td>{order.phone}</td>
                  <td>{order.email}</td>
                  <td>${order.total}</td>
                  <td>{order.payment_method}</td>

                  <td>
                    <select
                      className="form-select"
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order.id, e.target.value)
                      }
                    >
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </td>

                  <td>
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteOrder(order.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;