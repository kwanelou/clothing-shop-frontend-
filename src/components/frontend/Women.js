import React from 'react'
import women1 from "../../assets/women4.jpg";
import women2 from "../../assets/women5.jpg";
import women3 from "../../assets/women6.jpg";
import women4 from "../../assets/women7.jpg";


const Women = () => {
  return (
    <>
    
       
     <section className='section3 py-5 mb-3'>
            <div className='section3-header text-center'>
                <span>Women Services</span>
                <h3>At <blockquote>Nyarial clothing Store</blockquote> we are dedicated to giving you more than just clothes</h3>
                <p>we deliver style, comfort, and confidence. Our services are designed to make your shopping experience easy, <br/> enjoyable, and personalized.</p>

            </div>
            <div className='row'>
                <div className='col-md-3'>
                    <div className='item'>
                        <div className='services-image'>
                            <img src={women1} alt='' className='w-100'/>


                        </div>
                        <div className='services-body'>
                            <div className='services-title'>
                                <h3 className='mb-2 '>Best women stylish</h3> 

                            </div>
                            <div className='services-content'>
                                <p className='text-color-dark'>we have all women types of clothes across the global</p>

                            </div>
                            <a href='/' className='btn btn-danger'>Read More...</a>

                        </div>

                    </div>

                </div>
                <div className='col-md-3'>
                    <div className='item'>
                        <div className='services-image'>
                            <img src={women2} alt='' className='w-100'/>


                        </div>
                        <div className='services-body'>
                            <div className='services-title'>
                                <h3 className='mb-2 '>Best women stylish</h3> 

                            </div>
                            <div className='services-content'>
                                <p className='text-color-dark'>we have all women types of clothes across the global</p>

                            </div>
                            <a href='/' className='btn btn-danger'>Read More...</a>

                        </div>

                    </div>

                </div>
               <div className='col-md-3'>
                    <div className='item'>
                        <div className='services-image'>
                            <img src={women3} alt='' className='w-100'/>


                        </div>
                        <div className='services-body'>
                            <div className='services-title'>
                                <h3 className='mb-2 '>Best women stylish</h3> 

                            </div>
                            <div className='services-content'>
                                <p className='text-color-dark'>we have all women types of clothes across the global</p>

                            </div>
                            <a href='/' className='btn btn-danger'>Read More...</a>

                        </div>

                    </div>

                </div>
               <div className='col-md-3'>
                    <div className='item'>
                        <div className='services-image'>
                            <img src={women4} alt='' className='w-100'/>


                        </div>
                        <div className='services-body'>
                            <div className='services-title'>
                                <h3 className='mb-2 '>Best young women outfit</h3> 

                            </div>
                            <div className='services-content'>
                                <p className='text-color-dark'>we have all women types of clothes across the global</p>

                            </div>
                            <a href='/' className='btn btn-danger'>Read More...</a>

                        </div>

                    </div>

                </div>
               
               

            </div>

        </section>
        
    
   
     </>
  )
}

export default Women
