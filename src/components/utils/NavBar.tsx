import React, { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown, NavLink, Form, Button } from "react-bootstrap"
import AuthModal, { AuthType, RegistrationType } from "../auth/AuthModal";
import { AccountContext } from "../../providers/AccountProvider";
const NavBar: React.FC = () => {
  const [modalShow, setModalShow] = useState(false);
  const [authType, setAuthType] = useState<AuthType>(AuthType.LOGIN);
  const [registrationType, setRegistrationType] = useState<RegistrationType>(RegistrationType.STUDENT);
  const { userId, userType, getUser} = useContext(AccountContext);

  useEffect(() => {
    getUser?.();
  }, [])

  function LogOut(){
    for(var i=0;i<window.localStorage.length;i++){
      var key = window.localStorage.key(i)
      if(key?.includes("Cognito") || key?.includes("user_type")){
        window.localStorage.removeItem(key);
      }
    }
    window.location.reload();
  }

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
          <Nav.Link href="#">Help</Nav.Link>
        </Nav>
        {!userId && <Nav className="d-flex">
          <NavDropdown title="Don't have an account?" id="basic-nav-dropdown">
            <NavDropdown.Item href="#" onClick={() => {setModalShow(true); setAuthType(AuthType.SIGNUP); setRegistrationType(RegistrationType.STUDENT)}}>Register as Student</NavDropdown.Item>
            <NavDropdown.Item href="#" onClick={() => {setModalShow(true); setAuthType(AuthType.SIGNUP); setRegistrationType(RegistrationType.COMPANY)}}>Register as Company</NavDropdown.Item>
          </NavDropdown>
          <Button variant="light" onClick={() => {setModalShow(true); setAuthType(AuthType.LOGIN)}}>Log In</Button>
        </Nav>}
        {userId && <Button variant="light" onClick={() => LogOut()}>Log Out</Button>}
      </Navbar.Collapse>
      </Container>
      <AuthModal show={modalShow} type={authType} registration_type={registrationType} onHide={() => setModalShow(false)}/>
    </Navbar>
  )
}
export default NavBar;