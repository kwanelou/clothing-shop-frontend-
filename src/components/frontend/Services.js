import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/get-services");
      const data = await response.json();

      if (Array.isArray(data)) {
        setServices(data);
      } else if (data.status && Array.isArray(data.data)) {
        setServices(data.data);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.log("Error fetching services:", error);
    }
  };

  const handleOrder = async (service) => {
    try {
      setLoadingId(service.id);

      const userInfo = JSON.parse(localStorage.getItem("userinfo"));

      // CHECK LOGIN
      if (!userInfo || !userInfo.token) {
        alert("Please login first");
        return;
      }

      // token
      const token = userInfo.token;

      console.log("TOKEN:", token); // debug

      const response = await fetch("http://127.0.0.1:8000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          service_id: service.id,
          service_title: service.title,
          price: service.price || 0,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Order placed successfully. Waiting for approval.");
      } else {
        console.log("ORDER ERROR:", data);
        alert(data.message || "Failed to place order");
      }
    } catch (error) {
      console.log("Order Error:", error);
      alert("Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="services-page">

      {/* HERO */}
      <div className="bg-dark text-white text-center py-5">
        <div className="container">
          <h1 className="fw-bold">Our Premium Services</h1>
          <p>Discover fashion services designed for your style.</p>
        </div>
      </div>

      {/* SERVICES */}
      <div className="container py-5">

        <div className="row">

          {services.length > 0 ? (
            services.map((service) => (
              <div className="col-md-4 mb-4" key={service.id}>
                <div className="card h-100 border-0 shadow-sm">

                  <img
                    src={
                      service.image
                        ? `http://127.0.0.1:8000/uploads/services/${service.image}`
                        : "https://via.placeholder.com/400x300"
                    }
                    className="card-img-top"
                    alt={service.title}
                    style={{ height: "250px", objectFit: "cover" }}
                  />

                  <div className="card-body d-flex flex-column">

                    <h5 className="fw-bold">{service.title}</h5>

                    <p className="text-muted">
                      {service.short_desc
                        ? service.short_desc.substring(0, 100) + "..."
                        : "Premium service for your lifestyle."}
                    </p>

                    {service.price && (
                      <h6 className="fw-bold text-danger">
                        ${service.price}
                      </h6>
                    )}

                    <div className="mt-auto d-flex gap-2">

                      

                      <button
                        className="btn btn-dark w-50"
                        onClick={() => handleOrder(service)}
                        disabled={loadingId === service.id}
                      >
                        {loadingId === service.id ? "Ordering..." : "Order Now"}
                      </button>

                    </div>

                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <h5>No services available</h5>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};

export default Services;