import React from 'react'
import Footer from '../everywhere/Footer'
import Header from '../everywhere/Header'
import Heros from './Heros'

const Services = () => {
  return (
   <>
   <Heros/>
    <div>
  <section className='services-section py-5'>
      <div className='container'>

        {/* Header */}
        <div className='text-center mb-5'>
          <span className='text-uppercase'>Our Services</span>
          <h2>What We Offer</h2>
          <p>
            We provide high-quality fashion services to ensure the best shopping experience for our customers.
          </p>
        </div>

        {/* Services Grid */}
        <div className='row'>

          {/* Service 1 */}
          <div className='col-12 col-md-4 mb-4'>
            <div className='service-box p-4 shadow-sm h-100'>
              <h4>👕 Men's Fashion</h4>
              <p>
                A wide collection of modern and classic outfits for men, designed for comfort and style.
              </p>
            </div>
          </div>

          {/* Service 2 */}
          <div className='col-12 col-md-4 mb-4'>
            <div className='service-box p-4 shadow-sm h-100'>
              <h4>👗 Women's Fashion</h4>
              <p>
                Elegant and trendy clothing for women, suitable for all occasions from casual to formal.
              </p>
            </div>
          </div>

          {/* Service 3 */}
          <div className='col-12 col-md-4 mb-4'>
            <div className='service-box p-4 shadow-sm h-100'>
              <h4>🧒 Kids Collection</h4>
              <p>
                Comfortable, colorful, and durable clothing for kids of all ages.
              </p>
            </div>
          </div>

          {/* Service 4 */}
          <div className='col-12 col-md-4 mb-4'>
            <div className='service-box p-4 shadow-sm h-100'>
              <h4>🚚 Fast Delivery</h4>
              <p>
                Quick and reliable delivery services to get your orders to your doorstep on time.
              </p>
            </div>
          </div>

          {/* Service 5 */}
          <div className='col-12 col-md-4 mb-4'>
            <div className='service-box p-4 shadow-sm h-100'>
              <h4>💳 Secure Payment</h4>
              <p>
                Safe and secure payment methods to protect your transactions.
              </p>
            </div>
          </div>

          {/* Service 6 */}
          <div className='col-12 col-md-4 mb-4'>
            <div className='service-box p-4 shadow-sm h-100'>
              <h4>📞 Customer Support</h4>
              <p>
                Dedicated support team available to assist you with your orders and inquiries.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  
    </div>
    </>
  
  )
}

export default Services
