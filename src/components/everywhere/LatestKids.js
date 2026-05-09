import React, { useEffect, useState } from 'react';

const Latestkids = () => {
  const [kids, setkids] = useState([]);

  const fetchLatestkids = async () => {
    try {
      const res = await fetch(
        'http://127.0.0.1:8000/api/get-latest-kids?limit=4',
        {
          method: 'GET',
        }
      );

      const result = await res.json();
      console.log(result);

      if (result.status === true) {
        setkids(result.data);
      }
    } catch (error) {
      console.error('Error fetching men services:', error);
    }
  };

  useEffect(() => {
    fetchLatestkids();
  }, []);

  return (
    <>
      <section className='section3 py-5 mb-3'>
        <div className='container'>
          <div className='section3-header text-center mb-5'>
            <span>Latest Kids Services</span>
            <h3>
              our kids Premium Shopping Services Designed for Your Convenience
            </h3>
            <p>
             We provide a range of premium services to enhance your shopping experience and ensure maximum customer satisfaction. <br/>
            From fast and reliable express delivery to personalized styling consultations, our goal is to make online shopping 
          <br/>simple, enjoyable, and tailored to your needs.
            </p>
          </div>

          <div className='row'>
            {kids && kids.length > 0 ? (
              kids.map((kid) => {
                return (
                  <div className='col-md-6 mb-4' key={kid.id}>
                    <div className='item shadow-sm '>
                      <div className='services-image'>
                        <img
                          src={`http://127.0.0.1:8000/uploads/Kids/${kid.image}`}
                          alt={kid.title}
                          className="card-img-top"
                          style={{
                          height: "250px",
                          objectFit: "cover",
                        }}
                         
                        />
                      </div>

                      <div className='services-body p-3'>
                        <div className='services-title'>
                          <h3 className='mb-2'>{kid.title}</h3>
                        </div>

                        <div className='services-content'>
                          <p className='text-color-dark bg-secondary'>{kid.kids_desc}</p>
                        </div>

                        <a href='/services' className='btn btn-danger'>
                          Read More...
                        </a>
                      </div>
                    </div>
                    <p className='text-center text-danger bg-dark border-2 mt-3'>Price:{kid.price}$</p>
                  </div>
                  
                );
              })
            ) : (
              <div className='col-12 text-center'>
                <p>No kids services found.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Latestkids;