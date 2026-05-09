import React, { useEffect, useState } from 'react';
import { addToCart } from '../../utils/cart';

const Kids = () => {
  const [kid, setkid] = useState([]);

  const fetchkid = async () => {
    try {
      const res = await fetch(
        'http://127.0.0.1:8000/api/get-kids'
      );

      const result = await res.json();

      if (result.status === true) {
        setkid(result.data);
      }
    } catch (error) {
      console.error('Error fetching kids products:', error);
    }
  };

  useEffect(() => {
    fetchkid();
  }, []);

  return (
    <section className='section3 py-5 mb-3'>
      <div className='container'>
        <div className='section3-header text-center mb-5'>
          <span>Our Kids Services</span>

          <h3>
            Our Kids Premium Shopping Services Designed for Your Convenience
          </h3>

          <p>
            We provide a range of premium services to enhance your shopping experience and ensure maximum customer satisfaction.
            <br />
            From fast and reliable express delivery to personalized styling consultations.
          </p>
        </div>

        <div className='row'>
          {kid && kid.length > 0 ? (
            kid.map((k) => (
              <div className='col-md-3 mb-4' key={k.id}>

                {/* PRODUCT CARD */}
                <div className='item shadow-sm'>
                  <div className='services-image'>
                    <img
                      src={`http://127.0.0.1:8000/uploads/Kids/${k.image}`}
                      alt={k.title}
                      className='w-100'
                    />
                  </div>

                  <div className='services-body p-3'>
                    <h3 className='mb-2'>{k.title}</h3>

                    <p className='text-color-dark'>
                      {k.kids_desc}
                    </p>

                    <a href='/' className='btn btn-danger'>
                      Read More...
                    </a>
                  </div>
                </div>

                {/* PRICE + CART */}
                <div className="d-flex gap-2 w-100 align-items-stretch mt-3">

                  <div className="bg-dark text-danger flex-fill text-center py-2 rounded">
                    Price: ${k.price}
                  </div>

                  {/* ✅ FIXED CART BUTTON */}
                  <button
                    onClick={() => addToCart(k, 'Kids')}
                    className="btn btn-success flex-fill"
                  >
                    Add to Cart
                  </button>

                </div>

              </div>
            ))
          ) : (
            <div className='col-12 text-center'>
              <p>No kids clothes found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Kids;