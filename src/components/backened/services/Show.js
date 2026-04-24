import React, { useEffect, useState } from 'react';
import Sidebar from '../../everywhere/Sidebar';
import { Link } from 'react-router-dom';
import { Toast } from 'react-bootstrap';

const Show = () => {
  const [services, setServices] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userinfo"));
      const token = userInfo?.token;

      const response = await fetch("http://127.0.0.1:8000/api/services", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log(data);

      if (Array.isArray(data)) {
        setServices(data);
      } else if (data.status === true && Array.isArray(data.data)) {
        setServices(data.data);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.log("Error fetching services:", error);
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;

    try {
      const userInfo = JSON.parse(localStorage.getItem("userinfo"));
      const token = userInfo?.token;

      const response = await fetch(
        `http://127.0.0.1:8000/api/services/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      console.log("DELETE RESULT:", result);

      if (result.status) {
        setServices((prev) => prev.filter((item) => item.id !== id));
        setToastMessage("Service deleted successfully!");
      } else {
        setToastMessage(result.message || "Failed to delete service");
      }

      setShowToast(true);
    } catch (error) {
      console.log("DELETE ERROR:", error);
      setToastMessage("Something went wrong");
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
            bg={toastMessage.includes("successfully") ? "success" : "danger"}
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

      {/* CONTENT */}
      <div className='container my-5'>
        <div className='row'>

          {/* SIDEBAR */}
          <div className='col-md-3'>
            <div className='card shadow border-0'>
              <div className='card-body'>
                <Sidebar />
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className='col-md-9'>
            <div className='card shadow border-0'>
              <div className='card-body p-4'>

                <div className='d-flex justify-content-between align-items-center'>
                  <h4 className='h5 mb-0'>Services</h4>

                  <Link to='/createService' className='btn btn-primary'>
                    Create
                  </Link>
                </div>

                <hr />

                <div className='table-responsive'>
                  <table className='table table-striped table-bordered'>

                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Slug</th>
                        <th>Status</th>
                        <th>Price</th>
                        <th>Content</th>
                        <th>Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {services.length > 0 ? (
                        services.map((service) => (
                          <tr key={service.id}>

                            <td>{service.id}</td>

                            <td>
                              {service.image ? (
                                <img
                                  src={`http://127.0.0.1:8000/uploads/services/${service.image}`}
                                  alt={service.title}
                                  width="80"
                                  height="60"
                                  className='img-fluid rounded'
                                />
                              ) : (
                                "No Image"
                              )}
                            </td>

                            <td>{service.title}</td>
                            <td>{service.slug}</td>

                            {/* FIXED STATUS */}
                            <td>{service.status === 1 ? "active" : "blocked"}</td>

                            {/* FIXED PRICE */}
                            <td>${service.price ?? 0}</td>

                            <td>
                              {service.content
                                ? service.content.substring(0, 50) + "..."
                                : ""}
                            </td>

                            <td>
                              {service.short_desc
                                ? service.short_desc.substring(0, 50) + "..."
                                : ""}
                            </td>

                            <td className='d-flex'>
                              <Link
                                to={`/editService/${service.id}`}
                                className='btn btn-sm btn-danger me-2'
                              >
                                Edit
                              </Link>

                              <button
                                onClick={() => deleteService(service.id)}
                                className='btn btn-sm btn-dark'
                              >
                                Delete
                              </button>
                            </td>

                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className='text-center'>
                            No services found
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
      </div>

    </main>
  );
};

export default Show;