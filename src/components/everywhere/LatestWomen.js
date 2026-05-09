import React, { useEffect, useState } from 'react';

const LatestWomen = () => {
  const [womens, setwomens] = useState([]);

  const fetchLatestWomens = async () => {
    try {
      const res = await fetch(
        'http://127.0.0.1:8000/api/get-latest-womens?limit=4',
        {
          method: 'GET',
        }
      );

      const result = await res.json();
      console.log(result);

      if (result.status === true) {
        setwomens(result.data);
      }
    } catch (error) {
      console.error('Error fetching men services:', error);
    }
  };

  useEffect(() => {
    fetchLatestWomens();
  }, []);

  return (
    <>
      <section className='section3 py-5 mb-3'>
        <div className='container'>
          <div className='section3-header text-center mb-5'>
            <span>Women clothing  Services</span>
            <h3>
              At our Store, Fast Delivery & Secure Handling
            </h3>
            <p>
             Our express delivery service ensures your orders arrive quickly and safely, with priority processing and secure packaging. <br/>
Whether you need your items urgently or want guaranteed shipping reliability, we’ve got you covered.
            </p>
          </div>

          <div className='row'>
            {womens && womens.length > 0 ? (
              womens.map((women) => {
                return (
                  <div className='col-md-6 mb-4' key={women.id}>
                    <div className='item shadow-sm '>
                      <div className='services-image'>
                        <img
                          src={`http://127.0.0.1:8000/uploads/Womens/${women.image}`}
                          alt={women.title}
                          className="card-img-top"
                          style={{
                          height: "250px",
                          objectFit: "cover",
                        }}
                         
                        />
                      </div>

                      <div className='services-body p-3'>
                        <div className='services-title'>
                          <h3 className='mb-2'>{women.title}</h3>
                        </div>

                        <div className='services-content'>
                          <p className='text-color-dark bg-secondary'>{women.description}</p>
                        </div>

                        <a href='/services' className='btn btn-danger'>
                          Read More...
                        </a>
                      </div>
                    </div>
                    <p className='text-center text-danger bg-dark border-2 mt-3'>Price:{women.price}$</p>
                  </div>
                  
                );
              })
            ) : (
              <div className='col-12 text-center'>
                <p>No women services found.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default LatestWomen;