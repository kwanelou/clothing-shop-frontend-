import { Nav, Navbar } from 'react-bootstrap';
import { NavLink, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../backened/context/Auth";
import { getCartCount } from "../../utils/cart";
import logo from '../../assets/nyarial_logo.png';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCart = () => {
      setCartCount(getCartCount());
    };

    updateCart();

    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  return (
    <header className="sticky-top">
      <div className='container py-3'>
        <Navbar expand="lg">

          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt='' width="60px" />
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse>

            <Nav className="ms-auto align-items-lg-center">

              {/* HOME */}
              <Nav.Link as={NavLink} to="/">Home</Nav.Link>

              {/* CATEGORY DROPDOWN */}
              <li className="nav-item dropdown">

                <span
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  Category
                </span>

                <ul className="dropdown-menu">

                  <li>
                    <NavLink className="dropdown-item" to="/men">
                      Men
                    </NavLink>
                  </li>

                  <li>
                    <NavLink className="dropdown-item" to="/women">
                      Women
                    </NavLink>
                  </li>

                  <li>
                    <NavLink className="dropdown-item" to="/kid">
                      Kids
                    </NavLink>
                  </li>

                </ul>
              </li>

              {/* OTHER LINKS */}
              <Nav.Link as={NavLink} to="/about">About</Nav.Link>
              <Nav.Link as={NavLink} to="/services">Services</Nav.Link>
              <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
              <Nav.Link as={NavLink} to="/profile">UserProfile</Nav.Link>
              <Nav.Link as={NavLink} to="/myorder">My Orders</Nav.Link>

              {/* CART ICON */}
              <Link to="/cart" className="nav-link position-relative">
                <i className="bi bi-cart3 fs-4"></i>

                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* AUTH */}
              {!user ? (
                <>
                  <Nav.Link as={NavLink} to="/login">
                    Login
                  </Nav.Link>
                </>
              ) : (
                <>
                  {user?.user?.role === "admin" && (
                    <Nav.Link as={NavLink} to="/showService">
                      Dashboard
                    </Nav.Link>
                  )}

                  <button
                    onClick={() => {
                      const confirmLogout = window.confirm(
                        "Do you want to logout please?"
                      );

                      if (confirmLogout) logout();
                    }}
                    className="btn btn-dark ms-3"
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
  );
};

export default Header;