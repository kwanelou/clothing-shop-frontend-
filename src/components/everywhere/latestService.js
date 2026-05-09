import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import men1 from "../../assets/men2.jpg";
import men2 from "../../assets/men6.jpg";
import men3 from "../../assets/men8.jpg";
import men4 from "../../assets/men9.jpg";

const LatestServices = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const defaultImages = [men1, men2, men3, men4];

  useEffect(() => {
    fetchLatestServices();
  }, []);

  const fetchLatestServices = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/get-latest-services?limit=4"
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        setServices(data);
        setFilteredServices(data);
      } else if (data.status === true && Array.isArray(data.data)) {
        setServices(data.data);
        setFilteredServices(data.data);
      } else {
        setServices([]);
        setFilteredServices([]);
      }
    } catch (error) {
      console.log("Error fetching latest services:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const filtered = services.filter((service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (service.short_desc &&
        service.short_desc.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    setFilteredServices(filtered);
  };

  return (
    <section className="section3 py-5 mb-3">
      <div className="container">
        <div className="section3-header text-center mb-5">
          <span>Our Latest Services</span>

          <h3 className="mt-3">
            At Nyarial Clothing Store, we are dedicated
            to giving you more than just clothes
          </h3>

          <p>
            We deliver style, comfort, and confidence. Our services are designed
            to make your shopping experience easy,
            <br />
            enjoyable, and personalized.
          </p>

          {/* SEARCH BAR */}
          <form
            onSubmit={handleSearch}
            className="service-search-form mt-4"
          >
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="service-search-input"
            />

            <button type="submit" className="service-search-btn">
              Search
            </button>
          </form>
        </div>

        <div className="row">
          {filteredServices.length > 0 ? (
            filteredServices.map((service, index) => (
              <div className="col-md-3 mb-4" key={service.id}>
                <div className="card h-100 shadow border-0">
                  <div className="services-image">
                    {service.image ? (
                      <img
                        src={`http://127.0.0.1:8000/uploads/services/${service.image}`}
                        alt={service.title}
                        className="card-img-top"
                        style={{
                          height: "250px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src={defaultImages[index % defaultImages.length]}
                        alt="Default Service"
                        className="card-img-top"
                        style={{
                          height: "250px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </div>

                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{service.title}</h5>

                    <p className="card-text text-muted">
                      {service.short_desc
                        ? service.short_desc.substring(0, 80) + "..."
                        : "No description available"}
                    </p>

                    <div className="mt-auto">
                      <Link to="/services" className="btn btn-danger">
                        Read More...
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <h5>No matching services found</h5>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestServices;