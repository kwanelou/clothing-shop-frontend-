import React from 'react'
import kid1 from "../../assets/kid3.jpg";
import kid2 from "../../assets/kid7.jpg";
import kid3 from "../../assets/kid2.jpg";
import kid4 from "../../assets/kid10.jpg";


const Kid = () => {
  return (
    <>
    
        
    <section className='section3 py-5 mb-3'>
            <div className='section3-header text-center'>
                <span>Kids Services</span>
                <h3>At <blockquote>Nyarial clothing Store</blockquote> we are dedicated to giving you more than just clothes</h3>
                <p>we deliver style, comfort, and confidence. Our services are designed to make your shopping experience easy, <br/> enjoyable, and personalized.</p>

            </div>
            <div className='row'>
                <div className='col-md-3'>
                    <div className='item'>
                        <div className='services-image'>
                            <img src={kid1} alt='' className='w-100'/>


                        </div>
                        <div className='services-body'>
                            <div className='services-title'>
                                <h3 className='mb-2 '>Best kids stylish</h3> 

                            </div>
                            <div className='services-content'>
                                <p className='text-color-dark'>we have all kids clothes across the global</p>

                            </div>
                            <a href='/' className='btn btn-danger'>Read More...</a>

                        </div>

                    </div>

                </div>
                <div className='col-md-3'>
                    <div className='item'>
                        <div className='services-image'>
                            <img src={kid2} alt='' className='w-100'/>


                        </div>
                        <div className='services-body'>
                            <div className='services-title'>
                                <h3 className='mb-2 '>Best kids stylish</h3> 

                            </div>
                            <div className='services-content'>
                                <p className='text-color-dark'>we have all kids clothes across the global</p>

                            </div>
                            <a href='/' className='btn btn-danger'>Read More...</a>

                        </div>

                    </div>

                </div>
               <div className='col-md-3'>
                    <div className='item'>
                        <div className='services-image'>
                            <img src={kid3} alt='' className='w-100'/>


                        </div>
                        <div className='services-body'>
                            <div className='services-title'>
                                <h3 className='mb-2 '>Best kids stylish</h3> 

                            </div>
                            <div className='services-content'>
                                <p className='text-color-dark'>we have all kids clothes across the global</p>

                            </div>
                            <a href='/' className='btn btn-danger'>Read More...</a>

                        </div>

                    </div>

                </div>
               <div className='col-md-3'>
                    <div className='item'>
                        <div className='services-image'>
                            <img src={kid4} alt='' className='w-100'/>


                        </div>
                        <div className='services-body'>
                            <div className='services-title'>
                                <h3 className='mb-2 '>Best young indian kids outfit</h3> 

                            </div>
                            <div className='services-content'>
                                <p className='text-color-dark'>we have all kids clothes across the global</p>

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

export default Kid
