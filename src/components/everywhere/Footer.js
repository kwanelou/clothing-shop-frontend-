import React from 'react'
import ligo from "../../assets/nyarial_logo.png" 

const Footer = () => {
  return (
    <footer>
        <div className='container '>
            <div className='row py-3'>
                <div className='col-md-3 mb-3'>
                    <img src={ligo} alt='' width="80px"/>
                    <h3>Nyarial shop</h3>
                    <p>Customer satisfaction is our <br/>Carefully selected designs <br/>Easy shopping experience 
                    <br/>Reliable service <br/>kindly trust our online services</p>



                </div>
                <div className='col-md-3 mb-3'>
                    <h3>Our Services</h3>
                    <ul>
                        <li>
                            <a href='/'>Delivery when order</a>
                        </li>
                        <li>
                            <a href='/'>allow our customers to make the right choice</a>
                        </li>
                        <li>
                            <a href='/'>no load but all cash or ATM</a>
                        </li>
                        <li>
                            <a href='/'> we accept online order payment</a>
                        </li>
                       
                    </ul>

                </div>
                <div className='col-md-3 mb-3'>
                    <h3>Quick Links</h3>
                    <ul>
                        <li>
                            <a href='/'>Home</a>
                        </li>
                        <li>
                            <a href='/men'>Men</a>
                        </li>
                        <li>
                            <a href='/kid'>Kids</a>
                        </li>
                        <li>
                            <a href='/women'>Women</a>
                        </li>
                        <li>
                            <a href='/About'>About</a>
                        </li>
                        <li>
                            <a href='/'>Services</a>
                        </li>
                       
                    </ul>

                </div>
                <div className='col-md-3 mb-3'>
                    <h3>Contact Us</h3>
                    <p>+21269-182-9936</p>
                    <p>+211 926 487 825</p>
                    <p>Kwanelou@gmail.com</p>
                    <p>Nargis Fes-63456</p>
                    <p>City-Fes-Maroc</p>
                    
                </div>
                 <hr/>
                 <div className='text-center right'> 
                    Copyright @2026 nyarial cothing shop.all right reserved

                 </div>

            </div>

        </div>
       


       </footer>
  )
}

export default Footer
