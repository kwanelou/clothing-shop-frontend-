import React from 'react'

const contact = () => {
  return (
    <>
    <section className='contact-section py-5' >
      <div className='container-fluid py-4'>
        <div className='contact-header text-center'>
          <span>Contact Us</span>
          <h2>Our dedicated staffs are here to help you with your questions, contact us by </h2>
          <p>filling out the form below and we will respond to you shortly</p>

        </div>
        <div className='row mt-3 '>
          <div className='col-md-3'>
            <div className='card p-5 shadow border-2 contact-details'>
                <div>
              <h2>Call Us</h2>
              <div>(069-182-9936)</div>
              <div>(079-182-9936)</div>
             </div>
             <div>
              <h2>Write to us</h2>
              <div><a href='#'>Kwanelou@gmail.com</a></div>
            
             </div>
             <div>
              <h2>Address</h2>
              <div><a href='#'>Nargis street2345-ER6</a></div>
             
             </div>


            
             
            </div>


          </div>
          <div className='col-md-9'>
            <div className='card shadow border-3 m-10 p-5 bg-secondary '>
              <form action="" >
              <div>
                <label className='form-label'>Name</label>
                <input type='text' className='form-control form-control-lg ' placeholder='enter your name' name='name'/>
              </div>
              <div>
                <label className='form-label'>Email</label>
                <input type='email' className='form-control form-control-lg ' placeholder='enter your email' name='email'/>
              </div>
              <div>
                <label className='form-label'>Phone</label>
                <input type='number' className='form-control form-control-lg ' placeholder='enter your phone number' name='phone'/>
              </div>
              <div>
                <label className='form-label'>Subject</label>
                <input type='text' className='form-control form-control-lg ' placeholder='your subject name here' name='subject'/>
              </div>
              <div>
                <label className='form-label'>Message</label>
                <textarea className='form-control form-control-lg  ' placeholder='type your message here' name='message' id='' rows={3}></textarea>
              </div>
              <button className='btn btn-danger mt-3'>Submit</button>

            </form>

            </div>

          </div>

        </div>



      </div>

    </section>
    </>
  )
}

export default contact
