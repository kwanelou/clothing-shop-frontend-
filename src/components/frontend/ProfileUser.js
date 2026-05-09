import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../backened/context/Auth";

const Profile = () => {
  const { user } = useContext(AuthContext);

  // Redirect if user is not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container py-5">
      <div className="card shadow border-0 rounded-4 p-4 mx-auto" style={{ maxWidth: "800px" }}>
        <div className="text-center mb-4 bg-danger">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Profile"
            className="rounded-circle border shadow-sm"
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
            }}
          />

          <h2 className="mt-3">{user?.user?.name}</h2>
          <p className="text-muted text-color-white">{user?.user?.email}</p>
        </div>

        <div className="row bg-dark">
          <div className="col-md-6 mb-3">
            <label className="fw-bold mb-1">Name</label>
            <div className="form-control bg-light">
              {user?.user?.name}
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <label className="fw-bold mb-1">Email</label>
            <div className="form-control bg-light">
              {user?.user?.email}
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <label className="fw-bold mb-1">Role</label>
            <div className="form-control bg-light">
              {user?.user?.role || "User"}
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <label className="fw-bold mb-1">User ID</label>
            <div className="form-control bg-light">
              {user?.user?.id}
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Profile;