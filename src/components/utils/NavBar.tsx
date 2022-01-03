import React, { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown, NavLink, Form, Button } from "react-bootstrap"
import AuthModal, { AuthType } from "../auth/AuthModal";
import { AccountContext } from "../../providers/AccountProvider";
const NavBar: React.FC = () => {
  const [modalShow, setModalShow] = useState(false);
  const [authType, setAuthType] = useState<AuthType>(AuthType.LOGIN);
  const { userId, getUser} = useContext(AccountContext);
  useEffect(() => {
      getUser?.();
  }, [])
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
          <Nav.Link href="#">Home</Nav.Link>
          <Nav.Link href="#action2">Help</Nav.Link>
        </Nav>
        {!userId && <Nav className="d-flex">
          <NavDropdown title="Don't have an account?" id="basic-nav-dropdown">
            <NavDropdown.Item href="#" onClick={() => {setModalShow(true); setAuthType(AuthType.SIGNUP)}}>Register as Student</NavDropdown.Item>
            <NavDropdown.Item href="#" onClick={() => {setModalShow(true); setAuthType(AuthType.SIGNUP)}}>Register as Company</NavDropdown.Item>
          </NavDropdown>
          <Button variant="light" onClick={() => {setModalShow(true); setAuthType(AuthType.LOGIN)}}>Log In</Button>
        </Nav>}
      </Navbar.Collapse>
      </Container>
      <AuthModal show={modalShow} type={authType} onHide={() => setModalShow(false)}/>
    </Navbar>
  )
}
export default NavBar;