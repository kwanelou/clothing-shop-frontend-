import React, { useContext } from 'react'
import { AuthContext } from '../backened/context/Auth'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className='card shadow border-0 p-4'>
      <div className='card-body sidebar'>
        <h2>SideBar</h2>

        <ul>
          <li><Link to='/showService'>Dashboard</Link></li>
          <li><Link to='/menPage'>Men</Link></li>
          <li><Link to='/showkids'>Kids</Link></li>
          <li><Link to='/womenpage'>Women</Link></li>
          <li><Link to='/showService'>Services</Link></li>

          <li>
                <button
                onClick={() => {
                    const confirmLogout = window.confirm("Do you really want to logout?");

                    if (confirmLogout) {
                    logout();
                    }
                }}
                className="btn btn-dark ms-2"
                >
                Logout
                </button>
          </li>
        </ul>

      </div>
    </div>
  )
}

export default Sidebar