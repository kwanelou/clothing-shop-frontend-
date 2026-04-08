import { Nav, Navbar } from 'react-bootstrap'
import { NavLink, Link } from "react-router-dom";
import logo from '../../assets/nyarial_logo.png';

const Header = () => {
  return (
    /* this is Navbar which will  be on every component within the project */
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

              <Nav.Link as={NavLink} to="/">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/men">Men</Nav.Link>
              <Nav.Link as={NavLink} to="/kid">Kids</Nav.Link>
              <Nav.Link as={NavLink} to="/women">Women</Nav.Link>
              <Nav.Link as={NavLink} to="/about">About</Nav.Link>
              <Nav.Link as={NavLink} to="/services">Services</Nav.Link>
              <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>

            </Nav>
          </Navbar.Collapse>

        </Navbar>
      </div>
    </header>
  )
}

export default Header