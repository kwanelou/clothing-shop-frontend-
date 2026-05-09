import React, { useEffect, useState } from 'react';
import { addToCart } from '../../utils/cart';

const LatestMen = () => {
  const [mens, setMens] = useState([]);

  const fetchMens = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/get-mens');
      const result = await res.json();

      if (result.status === true) {
        setMens(result.data);
      }
    } catch (error) {
      console.error('Error fetching men products:', error);
    }
  };

  useEffect(() => {
    fetchMens();
  }, []);

  return (
    <section className='section3 py-5 mb-3'>
      <div className='container'>

        {/* HEADER */}
        <div className='section3-header text-center mb-5'>
          <span>Best Men Clothing Services</span>

          <h3>
            Welcome to Our Men Customization & Personal Assistance Site
          </h3>

          <p>
            Enjoy tailored services such as clothing adjustments,
            gift wrapping, and personal styling recommendations.
          </p>
        </div>

        {/* PRODUCTS */}
        <div className='row'>
          {mens && mens.length > 0 ? (
            mens.map((men) => (
              <div className='col-md-3 mb-4' key={men.id}>

                {/* CARD */}
                <div className='item shadow-sm'>

                  <div className='services-image'>
                    <img
                      src={`http://127.0.0.1:8000/uploads/Mens/${men.image}`}
                      alt={men.title}
                      className='w-100'
                    />
                  </div>

                  <div className='services-body p-3'>
                    <h3 className='mb-2'>{men.title}</h3>

                    <p className='text-color-dark'>
                      {men.desc}
                    </p>

                    <a href='/' className='btn btn-danger'>
                      Read More...
                    </a>
                  </div>

                </div>

                {/* PRICE + CART BUTTON */}
                <div className='d-flex gap-2 w-100 align-items-stretch mt-3'>

                  <div className='bg-dark text-danger flex-fill text-center py-2 rounded'>
                    Price: ${men.price}
                  </div>

                  <button
                    onClick={() =>
                      addToCart(
                        {
                          id: men.id,
                          title: men.title,
                          price: men.price,
                          image: men.image,   
                          category: 'Mens'
                        },
                        'Mens'
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
              <p>No men services found.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default LatestMen;