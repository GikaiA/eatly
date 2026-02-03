import React from 'react';
import './Navbar.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function NavMenu() {
  return (
<>
  <Navbar expand="lg" fixed='top'  variant="light" className="custom-navbar">
      <Container>
        <Navbar.Brand href="/" className='nav-title'>Eatly</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
           <button className='navbar-button'><Nav.Link href="/login">Login</Nav.Link></button> 
            <button className='navbar-button'><Nav.Link href="/register">Register</Nav.Link></button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
</>
  )
};

export default NavMenu
