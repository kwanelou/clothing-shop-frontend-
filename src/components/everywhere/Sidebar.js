import React, { useContext } from 'react'
import { AuthContext } from '../backened/context/Auth'

const Sidebar = () => {
    //logout
    const {logout} = useContext(AuthContext);
  return (
    <div className='card shadow border-0 p-4'>
        <div className='card-body sidebar'>
            <h2>SideBar</h2>
            <ul>
                <li><a href='#'>Dashboard</a></li>
                <li><a href='#'>Men</a></li>
                <li><a href='#'>Kids</a></li>
                <li><a href='#'>Women</a></li>
                <li><a href='#'>Services</a></li>
                <li><button onClick={logout} className='btn btn-dark mt-3'>Logout</button></li>
            </ul>

        </div>
      
    </div>
  )
}

export default Sidebar
