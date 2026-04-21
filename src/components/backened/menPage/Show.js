import React, { useEffect, useState } from 'react';
import Sidebar from '../../everywhere/Sidebar';
import { Link } from 'react-router-dom';
import { Toast } from 'react-bootstrap';


const Show = () => {
    const [men, setmen] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

  const fetchServices = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userinfo"));
      const token = userInfo?.token;

      const response = await fetch("http://127.0.0.1:8000/api/mens", {
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
        setmen(data);
      }

      if (data.status === true && Array.isArray(data.data)) {
        setmen(data.data);
      }
    } catch (error) {
      console.log("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);
    const deleteService = async (id) => {
  if (!window.confirm("Are you sure you want to delete this service?")) return;

  try {
    const userInfo = JSON.parse(localStorage.getItem("userinfo"));
    const token = userInfo?.token;

    const response = await fetch(
      `http://127.0.0.1:8000/api/mens/${id}`,
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
        setmen((prev) => prev.filter((item) => item.id !== id));

        setToastMessage("men clothe deleted successfully!");
        setShowToast(true);
        } else {
        setToastMessage(result.message || "Failed to delete men clothe");
        setShowToast(true);
        }
        } catch (error) {
            console.log("DELETE ERROR:", error);
        }
        };
  return (
    <>
      <main>
        
        <div
        //TOAST MESSAGE 
  aria-live="polite"
  aria-atomic="true"
  className="position-relative"
>
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


        <div className='container my-5'>
          <div className='row'>
            <div className='col-md-3'>
              <div className='card shadow border-0'>
                <div className='card-body'>
                  <Sidebar />
                </div>
              </div>
            </div>

            <div className='col-md-9'>
              <div className='card shadow border-0'>
                <div className='card-body p-4'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <h4 className='h5 mb-0'>Men Clothes</h4>

                    <Link to='/CreatemenPage' className='btn btn-primary'>
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
                          <th>Status</th>
                          <th>Content</th>
                          <th>Description</th>
                          <th>price</th>
                          <th width="150">Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {men.length > 0 ? (
                          men.map((men) => (
                            <tr key={men.id}>
                              <td>{men.id}</td>

                              <td>
                                {men.image ? (
                                  <img
                                    src={`http://127.0.0.1:8000/uploads/Mens/${men.image}`}
                                    alt={men.title}
                                    width="80"
                                    height="60"
                                    className='img-fluid rounded'
                                  />
                                ) : (
                                  "No Image"
                                )}
                              </td>

                              <td>{men.title}</td>
                              <td>{men.status==1?"active":"blocked"}</td>

                              <td>
                                {men.content
                                  ? men.content.substring(0, 50) + "..."
                                  : ""}
                              </td>

                              <td>
                                {men.desc
                                  ? men.desc.substring(0, 50) + "..."
                                  : ""}
                              </td>
                              <td>${men.price}</td>

                              <td className='d-flex'>
                                <Link
                                  to={`/editMen/${men.id}`}
                                  className='btn btn-sm btn-danger me-2'
                                >
                                  Edit
                                </Link>

                                <Link
                                    onClick={() => deleteService(men.id)}
                                    to='/showService'
                                    className='btn btn-sm btn-dark'
                                >
                                  Delete
                                </Link>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="8" className='text-center'>
                              No men clothe found
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
    </>
  );
};

export default Show;