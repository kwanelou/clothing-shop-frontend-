import React, { useEffect, useState } from 'react';

const Women = () => {
  const [womens, setwomens] = useState([]);

  const fetchWomens = async () => {
    try {
      const res = await fetch(
        'http://127.0.0.1:8000/api/get-womens',
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
    fetchWomens();
  }, []);

  return (
    <>
      <section className='section3 py-5 mb-3'>
        <div className='container'>
          <div className='section3-header text-center mb-5'>
            <span>Men Services</span>
            <h3>
              At <blockquote>Nyarial Clothing Store</blockquote> we are dedicated
              to giving you more than just clothes
            </h3>
            <p>
              We deliver style, comfort, and confidence. Our services are
              designed to make your shopping experience easy,
              <br />
              enjoyable, and personalized.
            </p>
          </div>

          <div className='row'>
            {womens && womens.length > 0 ? (
              womens.map((women) => {
                return (
                  <div className='col-md-3 mb-4' key={women.id}>
                    <div className='item shadow-sm '>
                      <div className='services-image'>
                        <img
                          src={`http://127.0.0.1:8000/uploads/womens/${women.image}`}
                          alt={women.title}
                          className='w-100'
                         
                        />
                      </div>

                      <div className='services-body p-3'>
                        <div className='services-title'>
                          <h3 className='mb-2'>{women.title}</h3>
                        </div>

                        <div className='services-content'>
                          <p className='text-color-dark'>{women.description}</p>
                        </div>

                        <a href='/' className='btn btn-danger'>
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
                <p>No women clothes found.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Women;