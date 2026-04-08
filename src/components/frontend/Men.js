import React from 'react'
import men4 from "../../assets/men9.jpg";
import men1 from "../../assets/men2.jpg";
import men2 from "../../assets/men6.jpg";
import men3 from "../../assets/men8.jpg";



const Men = () => {
  return (
    
    <>
    
        
    
        
   
    <section className='section3 py-5 mb-3'>
            <div className='section3-header text-center'>
                <span>Men Services</span>
                <h3>At <blockquote>Nyarial clothing Store</blockquote> we are dedicated to giving you more than just clothes</h3>
                <p>we deliver style, comfort, and confidence. Our services are designed to make your shopping experience easy, <br/> enjoyable, and personalized.</p>

            </div>
            <div className='row'>
                <div className='col-md-3'>
                    <div className='item'>
                        <div className='services-image'>
                            <img src={men1} alt='' className='w-100'/>


                        </div>
                        <div className='services-body'>
                            <div className='services-title'>
                                <h3 className='mb-2 '>Best men stylish</h3> 

                            </div>
                            <div className='services-content'>
                                <p className='text-color-dark'>we have all men types of clothes across the global</p>

                            </div>
                            <a href='/' className='btn btn-danger'>Read More...</a>

                        </div>

                    </div>

                </div>
                <div className='col-md-3'>
                    <div className='item'>
                        <div className='services-image'>
                            <img src={men2} alt='' className='w-100'/>


                        </div>
                        <div className='services-body'>
                            <div className='services-title'>
                                <h3 className='mb-2 '>Best kids stylish</h3> 

                            </div>
                            <div className='services-content'>
                                <p className='text-color-dark'>we have all men types of clothes across the global</p>

                            </div>
                            <a href='/' className='btn btn-danger'>Read More...</a>

                        </div>

                    </div>

                </div>
               <div className='col-md-3'>
                    <div className='item'>
                        <div className='services-image'>
                            <img src={men3} alt='' className='w-100'/>


                        </div>
                        <div className='services-body'>
                            <div className='services-title'>
                                <h3 className='mb-2 '>Best women stylish</h3> 

                            </div>
                            <div className='services-content'>
                                <p className='text-color-dark'>we have all men types of clothes across the global</p>

                            </div>
                            <a href='/' className='btn btn-danger'>Read More...</a>

                        </div>

                    </div>

                </div>
               <div className='col-md-3'>
                    <div className='item'>
                        <div className='services-image'>
                            <img src={men4} alt='' className='w-100'/>


                        </div>
                        <div className='services-body'>
                            <div className='services-title'>
                                <h3 className='mb-2 '>Best young men outfit</h3> 

                            </div>
                            <div className='services-content'>
                                <p className='text-color-dark'>we have all men types of clothes across the global</p>

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

export default Men
