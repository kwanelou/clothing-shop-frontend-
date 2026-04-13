import React from 'react'
import Sidebar from '../everywhere/Sidebar'


const Dashboard = () => {
   
  return (
    <>
    <main>
     <div className='container my-5'>
        <div className='row '>
        <div className='col-md-3'>
            {/*sidebar for dashboard */}
            <div className='card-body shadow border-0'>
                    {/*sidebar */}
                    <Sidebar/>

                </div>
        </div>
        <div className='col-md-9 dashboard'>
            <div className='card shadow border-0'>
                <div className='card-body d-flex justify-content-center align-items-center'>
                    <h3>Welcome to admin dashboard</h3>

                </div>

            </div>
            {/*dashboard */}
        </div>

    </div>

     </div>
   </main>
      
    </>
  )
}

export default Dashboard
