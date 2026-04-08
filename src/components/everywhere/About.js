import React from 'react'
import img from "../../assets/men1.jpg";
import Heros from '../frontend/Heros';


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
   
    </>

  )
}

export default About