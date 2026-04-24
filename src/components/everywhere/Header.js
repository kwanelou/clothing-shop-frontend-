import { Nav, Navbar } from 'react-bootstrap'
import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../backened/context/Auth";
import logo from '../../assets/nyarial_logo.png';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <div className='container py-3'>
        <Navbar expand="lg">

          <Navbar.Brand as={Link} to="/">
            Nyarial Shop
            <img src={logo} alt='' width="60px" />
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse>

            <Nav className="ms-auto">

              {/* PUBLIC LINKS */}
              <Nav.Link as={NavLink} to="/">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/men">Men</Nav.Link>
              <Nav.Link as={NavLink} to="/kid">Kids</Nav.Link>
              <Nav.Link as={NavLink} to="/women">Women</Nav.Link>
              <Nav.Link as={NavLink} to="/about">About</Nav.Link>
              <Nav.Link as={NavLink} to="/services">Services</Nav.Link>
              <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
              <Nav.Link as={NavLink} to="/profile">UserProfile</Nav.Link>
              <Nav.Link as={NavLink} to="/myorder">MyOrders</Nav.Link>

              {/* AUTH SECTION */}
              {!user ? (
                <>
                  <Nav.Link as={NavLink} to="/login">
                    Login
                  </Nav.Link>

                  
                </>
              ) : (
                <>
                  {/* DASHBOARD (only admin) */}
                  {user?.user?.role === "admin" && (
                    <Nav.Link as={NavLink} to="/showService">
                      Dashboard
                    </Nav.Link>
                  )}

                    <button
                      onClick={() => {
                        const confirmLogout = window.confirm("Do you want to logout please?");

                        if (confirmLogout) {
                          logout();
                        }
                      }}
                      className="btn btn-dark ms-2"
                    >
                      Logout
                    </button>
                </>
              )}

            </Nav>

          </Navbar.Collapse>

        </Navbar>
      </div>
    </header>
  )
}

export default Header;