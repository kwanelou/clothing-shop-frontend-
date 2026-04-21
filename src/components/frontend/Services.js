import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/get-services");
      const data = await response.json();

      console.log("Services:", data);

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

  return (
    <div className="services-page">

      {/* HERO SECTION */}
      <div className="bg-dark text-white text-center py-5">
        <div className="container">
          <h1 className="fw-bold">Our Premium Services</h1>
          <p className="mt-3">
            Discover fashion services designed to give you style, comfort, and confidence.
            At <strong>Nyarial Clothing Store</strong>, we don’t just sell clothes — we create identity.
          </p>
        </div>
      </div>

      {/* SERVICES SECTION */}
      <div className="container py-5">

        <div className="text-center mb-5">
          <h2>What We Offer</h2>
          <p className="text-muted">
            Everything you need to look your best, all in one place.
          </p>
        </div>

        <div className="row">
          {services.length > 0 ? (
            services.map((service) => (
              <div className="col-md-4 mb-4" key={service.id}>
                <div className="card h-100 border-0 shadow-sm service-card">

                  {/* IMAGE */}
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

                  {/* BODY */}
                  <div className="card-body d-flex flex-column">

                    <h5 className="fw-bold">{service.title}</h5>

                    <p className="text-muted">
                      {service.short_desc
                        ? service.short_desc.substring(0, 100) + "..."
                        : "Premium clothing service designed for your lifestyle."}
                    </p>

                    <ul className="small text-muted mb-3">
                      <li>High quality materials</li>
                      <li>Modern fashion styles</li>
                      <li>Affordable pricing</li>
                    </ul>

                    <div className="mt-auto">
                      <Link
                        to={`/service/${service.id}`}
                        className="btn btn-dark w-100"
                      >
                        View Details
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <h5>No services available at the moment</h5>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER CTA */}
      <div className="bg-light py-5 text-center">
        <div className="container">
          <h3>Ready to upgrade your style?</h3>
          <p className="text-muted">
            Visit our store or contact us for personalized fashion services.
          </p>
          <Link to="/" className="btn btn-danger px-4">
            Shop Now
          </Link>
        </div>
      </div>

    </div>
  );
};

export default Services;