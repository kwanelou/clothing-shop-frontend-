import React, { useEffect, useState } from 'react';
import { addToCart } from '../../utils/cart';

const Women = () => {
  const [womens, setwomens] = useState([]);

  const fetchWomens = async () => {
    try {
      const res = await fetch(
        'http://127.0.0.1:8000/api/get-womens'
      );

      const result = await res.json();

      if (result.status === true) {
        setwomens(result.data);
      }
    } catch (error) {
      console.error('Error fetching women products:', error);
    }
  };

  useEffect(() => {
    fetchWomens();
  }, []);

  return (
    <section className='section3 py-5 mb-3'>
      <div className='container'>

        {/* HEADER */}
        <div className='section3-header text-center mb-5'>
          <span>Women Clothing Services</span>

          <h3>
            At Our Store — Fast Delivery & Secure Handling
          </h3>

          <p>
            Our express delivery service ensures your orders
            arrive quickly and safely with secure packaging.
          </p>
        </div>

        {/* PRODUCTS */}
        <div className='row'>
          {womens && womens.length > 0 ? (
            womens.map((women) => (
              <div className='col-md-3 mb-4' key={women.id}>

                {/* CARD */}
                <div className='item shadow-sm'>

                  <div className='services-image'>
                    <img
                      src={`http://127.0.0.1:8000/uploads/womens/${women.image}`}
                      alt={women.title}
                      className='w-100'
                    />
                  </div>

                  <div className='services-body p-3'>
                    <h3 className='mb-2'>{women.title}</h3>

                    <p className='text-color-dark'>
                      {women.description}
                    </p>

                    <a href='/' className='btn btn-danger'>
                      Read More...
                    </a>
                  </div>

                </div>

                {/* PRICE + CART */}
                <div className='d-flex gap-2 w-100 align-items-stretch mt-3'>

                  <div className='bg-dark text-danger flex-fill text-center py-2 rounded'>
                    Price: ${women.price}
                  </div>

                  {/*ADD TO CART */}
                  <button
                    onClick={() =>
                      addToCart(
                        {
                          ...women,
                          imageUrl: `http://127.0.0.1:8000/uploads/womens/${women.image}`
                        },
                        'Women'
                      )
                    }
                    className='btn btn-success btn-sm flex-fill'
                  >
                    Add to Cart
                  </button>

                </div>

              </div>
            ))
          ) : (
            <div className='col-12 text-center'>
              <p>No women clothes found.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Women;