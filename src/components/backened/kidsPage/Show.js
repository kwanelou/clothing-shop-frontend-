import React, { useEffect, useState } from "react";
import Sidebar from "../../everywhere/Sidebar";
import { Link } from "react-router-dom";
import { Toast } from "react-bootstrap";

const Show = () => {
  const [kids, setKids] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const fetchKids = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userinfo"));
      const token = userInfo?.token;

      const response = await fetch("http://127.0.0.1:8000/api/kids", {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      console.log("KIDS DATA:", data);

      if (data.status === true && Array.isArray(data.data)) {
        setKids(data.data);
      } else {
        setKids([]);
      }
    } catch (error) {
      console.log("Error fetching kids:", error);
    }
  };

  useEffect(() => {
    fetchKids();
  }, []);

  const deleteKids = async (id) => {
    if (!window.confirm("Are you sure you want to delete this kids clothe?")) {
      return;
    }

    try {
      const userInfo = JSON.parse(localStorage.getItem("userinfo"));
      const token = userInfo?.token;

      const response = await fetch(
        `http://127.0.0.1:8000/api/kids/${id}`,
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
        setKids((prevKids) =>
          prevKids.filter((kid) => kid.id !== id)
        );

        setToastMessage("Kids clothe deleted successfully!");
        setShowToast(true);
      } else {
        setToastMessage(result.message || "Failed to delete kids clothe");
        setShowToast(true);
      }
    } catch (error) {
      console.log("DELETE ERROR:", error);
      setToastMessage("Something went wrong");
      setShowToast(true);
    }
  };

  return (
    <>
      <main>
        {/* TOAST */}
        <div
          aria-live="polite"
          aria-atomic="true"
          className="position-relative"
        >
          <div
            style={{
              position: "fixed",
              top: 20,
              right: 20,
              zIndex: 9999,
            }}
          >
            <Toast
              onClose={() => setShowToast(false)}
              show={showToast}
              delay={2000}
              autohide
              bg={
                toastMessage.toLowerCase().includes("success")
                  ? "success"
                  : "danger"
              }
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

        <div className="container my-5">
          <div className="row">
            {/* SIDEBAR */}
            <div className="col-md-3">
              <div className="card shadow border-0">
                <div className="card-body">
                  <Sidebar />
                </div>
              </div>
            </div>

            {/* TABLE */}
            <div className="col-md-9">
              <div className="card shadow border-0">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="h5 mb-0">Kids Clothes</h4>

                    <Link to="/createKids" className="btn btn-primary">
                      Create
                    </Link>
                  </div>

                  <hr />

                  <div className="table-responsive">
                    <table className="table table-striped table-bordered align-middle">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Image</th>
                          <th>Title</th>
                          <th>Status</th>
                          <th>Content</th>
                          <th>Description</th>
                          <th>Price</th>
                          <th width="150">Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {kids.length > 0 ? (
                          kids.map((kid) => (
                            <tr key={kid.id}>
                              <td>{kid.id}</td>

                              <td>
                                {kid.image ? (
                                  <img
                                    src={`http://127.0.0.1:8000/uploads/Kids/${kid.image}`}
                                    alt={kid.title}
                                    width="80"
                                    height="60"
                                    className="img-fluid rounded"
                                    style={{ objectFit: "cover" }}
                                  />
                                ) : (
                                  "No Image"
                                )}
                              </td>

                              <td>{kid.title}</td>

                              <td>
                                {kid.status == 1 ? "Active" : "Inactive"}
                              </td>

                              <td>
                                {kid.content
                                  ? kid.content.substring(0, 50) + "..."
                                  : "No Content"}
                              </td>

                              <td>
                                {kid.kids_desc
                                  ? kid.kids_desc.substring(0, 50) + "..."
                                  : "No Description"}
                              </td>

                              <td>${kid.price}</td>

                              <td>
                                <div className="d-flex gap-2">
                                  <Link
                                    to={`/editkids/${kid.id}`}
                                    className="btn btn-sm btn-primary"
                                  >
                                    Edit
                                  </Link>

                                  <button
                                    onClick={() => deleteKids(kid.id)}
                                    className="btn btn-sm btn-danger"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="8" className="text-center">
                              No kids clothes found
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