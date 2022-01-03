import React, { useContext, useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown, NavLink, Form, Button } from "react-bootstrap"
const NavBar: React.FC = () => {
  return(
    <Navbar bg="dark" variant="dark">
      <Container>
      <Navbar.Brand href="#home">Students' Internship System</Navbar.Brand>
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          <Nav.Link href="#action1">Home</Nav.Link>
          <Nav.Link href="#action2">Help</Nav.Link>
        </Nav>
        <Nav className="d-flex">
          <NavDropdown title="Don't have an account?" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Register as Student</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Register as Company</NavDropdown.Item>
          </NavDropdown>
          <Button variant="light">Log In</Button>
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default NavBar;