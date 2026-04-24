import React, { useEffect, useState } from "react";

const ShowOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const userInfo = JSON.parse(localStorage.getItem("userinfo"));

      if (!userInfo) {
        alert("Please login first");
        return;
      }

      const token = userInfo.token || userInfo?.user?.token;

      const response = await fetch("http://127.0.0.1:8000/api/orders", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      console.log("Orders:", data);

      if (Array.isArray(data)) {
        setOrders(data);
      } else if (data.orders) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, action) => {
    try {
      setUpdatingId(id);

      const userInfo = JSON.parse(localStorage.getItem("userinfo"));

      const token = userInfo.token || userInfo?.user?.token;

      const response = await fetch(
        `http://127.0.0.1:8000/api/orders/${id}/${action}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message || `Order ${action}d successfully`);
        fetchOrders();
      } else {
        alert(data.message || "Failed to update order");
      }
    } catch (error) {
      console.log("Update error:", error);
      alert("Something went wrong");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">All Orders</h2>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <h5>Loading orders...</h5>
        </div>
      ) : orders.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Email</th>
                <th>Service</th>
                <th>Price</th>
                <th>Status</th>
                <th>Date</th>
                <th width="220">Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>

                  <td>{order.user?.name || "Unknown User"}</td>

                  <td>{order.user?.email || "No Email"}</td>

                  <td>{order.service_title}</td>

                  <td>${order.price}</td>

                  <td>
                    <span
                      className={`badge px-3 py-2 ${
                        order.status === "approved"
                          ? "bg-success"
                          : order.status === "rejected"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td>
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>

                  <td>
                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => updateStatus(order.id, "approve")}
                        disabled={
                          updatingId === order.id ||
                          order.status === "approved"
                        }
                      >
                        {updatingId === order.id
                          ? "Updating..."
                          : "Approve"}
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => updateStatus(order.id, "reject")}
                        disabled={
                          updatingId === order.id ||
                          order.status === "rejected"
                        }
                      >
                        {updatingId === order.id
                          ? "Updating..."
                          : "Reject"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-5">
          <h4>No orders found</h4>
        </div>
      )}
    </div>
  );
};

export default ShowOrders;