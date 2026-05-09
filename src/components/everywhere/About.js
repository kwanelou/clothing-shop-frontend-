import React from 'react'
import img from "../../assets/men1.jpg";
import Heros from '../frontend/Heros';
import founderImg from "../../assets/image.png";

const About = () => {
  return (
    <>
      <Heros/>

      <section className='section2 py-4'>
        <div className='container'>
          <div className='row align-items-center'>

            <div className='col-12 col-md-6 mb-4'>
              <img src={img} alt='about' className='w-100' />
            </div>

            <div className='col-12 col-md-6'>
              <span>About Us</span>

              <h2>
                Welcome to our store — where style meets confidence.
              </h2>

              <p>
                We are passionate about creating clothing that helps you express who you are.
                Our mission is to provide high-quality, trendy, and affordable fashion for everyone.
              </p>

              <p>
                Our collections for Men, Women, and Kids are carefully selected to combine comfort,
                durability, and modern design.
              </p>

              <p>
                Our vision is to become a trusted fashion destination where everyone can find something they love.
              </p>
              
            </div>

          </div>
        </div>
      </section>
      <section className='py-5 section2'>
  <div className='container'>
    <div className='row align-items-center'>

      {/* FOUNDER IMAGE */}
      <div className='col-md-4 text-center mb-4'>
        <img
          src={founderImg}
          alt='Founder Nyarial Yak Nyak'
          className='img-fluid rounded shadow founder'
          style={{
            maxHeight: '400px',
            objectFit: 'cover'
          }}
        />
      </div>

      {/* FOUNDER INFO */}
      <div className='col-md-8'>
        <span>Founder</span>
        <h2 className='text-warning'>Nyarial Yak Nyak</h2>

        <p>
          Founder of Nyarial Clothing Store, established on <i className='text-danger'>26th June 2008</i> &nbsp;
          in <i className='text-warning'>Lankien, Nyirol County.</i>
        </p>

        <p>
          Her vision, resilience, and entrepreneurial spirit laid the foundation
          for a brand built on confidence, quality, and purpose.
        </p>

        <p>
          Through dedication and passion for fashion, she created a business
          that continues to inspire growth, creativity, and community impact.
        </p>
        <p>Nyarial Yak Nyak is woman of kind humble heart who employs young women and girls in her <br/>
              clothing store to creates jobs opportunity for them</p>
      </div>

    </div>
  </div>
</section>

      
    </>
  )
}

export default About