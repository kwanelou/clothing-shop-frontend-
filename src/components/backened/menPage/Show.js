import React, { useEffect, useState } from 'react';
import Sidebar from '../../everywhere/Sidebar';
import { Link } from 'react-router-dom';
import { Toast } from 'react-bootstrap';

const Show = () => {
  const [men, setMen] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  //  FETCH MEN DATA
  const fetchMens = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userinfo"));
      const token = userInfo?.token;

      const response = await fetch("http://127.0.0.1:8000/api/mens", {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        setMen(data);
      } else if (data.status && Array.isArray(data.data)) {
        setMen(data.data);
      }

    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchMens();
  }, []);

  //  DELETE FUNCTION
  const deleteMen = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const userInfo = JSON.parse(localStorage.getItem("userinfo"));
      const token = userInfo?.token;

      const response = await fetch(`http://127.0.0.1:8000/api/mens/${id}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const result = await response.json();

      console.log(result);

      if (response.ok) {
        setMen(prev => prev.filter(item => item.id !== id));
        setToastMessage("Deleted successfully!");
        setShowToast(true);
      } else {
        setToastMessage(result.message || "Delete failed");
        setShowToast(true);
      }

    } catch (error) {
      console.log("Delete error:", error);
      setToastMessage("Server error");
      setShowToast(true);
    }
  };

  return (
    <main>

      {/* TOAST */}
      <div aria-live="polite" aria-atomic="true">
        <div style={{ position: "fixed", top: 20, left: 150, zIndex: 9999 }}>
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={2000}
            autohide
            bg={toastMessage.includes("success") ? "success" : "danger"}
          >
            <Toast.Header>
              <strong className="me-auto">Notification</strong>
            </Toast.Header>
            <Toast.Body className="text-white">
              {toastMessage}
            </Toast.Body>
          </Toast>
        </div>
      </div>

      <div className='container my-5'>
        <div className='row'>

          {/* SIDEBAR */}
          <div className='col-md-3'>
            <Sidebar />
          </div>

          {/* CONTENT */}
          <div className='col-md-9'>
            <div className='card shadow border-0'>
              <div className='card-body p-4'>

                <div className='d-flex justify-content-between'>
                  <h4>Men Clothes</h4>

                  <Link to="/CreateMenPage" className="btn btn-primary">
                    Create
                  </Link>
                </div>

                <hr />

                <table className='table table-bordered table-striped'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Content</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {men.length > 0 ? (
                      men.map(item => (
                        <tr key={item.id}>
                          <td>{item.id}</td>

                          <td>
                            {item.image ? (
                              <img
                                src={`http://127.0.0.1:8000/uploads/Mens/${item.image}`}
                                width="70"
                                height="50"
                                alt=""
                              />
                            ) : "No Image"}
                          </td>

                          <td>{item.title}</td>
                          <td>{item.status == 1 ? "active" : "blocked"}</td>

                          <td>{item.content?.substring(0, 50)}...</td>
                          <td>{item.desc?.substring(0, 50)}...</td>
                          <td>${item.price}</td>

                          <td className='d-flex'>
                            <Link
                              to={`/editMen/${item.id}`}
                              className='btn btn-sm btn-danger me-2'
                            >
                              Edit
                            </Link>

                            <button
                              onClick={() => deleteMen(item.id)}
                              className='btn btn-sm btn-dark'
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className='text-center'>
                          No data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

              </div>
            </div>
          </div>

        </div>
      </div>

    </main>
  );
};

export default Show;