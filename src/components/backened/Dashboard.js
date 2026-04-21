import React, { useContext } from "react";
import Sidebar from "../everywhere/Sidebar";
import { AuthContext } from "../backened/context/Auth";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  // Block non-logged users
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Optional: block non-admin users
  if (user?.user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <main className="container-fluid">
      <div className="row my-4">

        {/* SIDEBAR */}
        <div className="col-md-3">
          <div className="card shadow border-0 p-2">
            <Sidebar />
          </div>
        </div>

        {/* MAIN DASHBOARD */}
        <div className="col-md-9">
          <div className="card shadow border-0">
            <div className="card-body d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "300px" }}>
              <h2>Welcome to Admin Dashboard</h2>
              <p className="text-muted">Manage your website data from here</p>
            </div>
          </div>

         
        </div>

      </div>
    </main>
  );
};

export default Dashboard;