import React, { useContext, useState } from 'react';

import { Button, Col, Form, Row } from 'react-bootstrap';

import { AccountContext } from '../../providers/AccountProvider';
const SignUp: React.FC =()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmError, setConfirmError] = useState<null | string>(null);
    const {signup} = useContext(AccountContext);

    const onSubmit = (event: { preventDefault: () => void; }) =>{
        event.preventDefault();
        if(password !== confirmPassword){
          setConfirmError("Please try again.");
          setPassword('');
          setConfirmPassword('');
        }else{
          setConfirmError(null);
          signup?.(email,password);
        }
    }

    return(
      <Form onSubmit={onSubmit}>
        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control type="email" value={email} placeholder="Enter email" onChange={event=>setEmail(event.target.value)} />
          </Col>
        </Form.Group>
        <br/>
        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control type="password" value={password} placeholder="Password" onChange={event=>setPassword(event.target.value)}/>
          </Col>
        </Form.Group>
        <br/>
        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Confirm Password
          </Form.Label>
          <Col sm="10">
            <Form.Control type="password" value={confirmPassword} placeholder="Confirm Password" onChange={event=>setConfirmPassword(event.target.value)}/>
          </Col>
        </Form.Group>
        <hr/>
        {confirmError && <p>{confirmError}</p>}
        <Button variant="secondary" type="submit">
          Sign up
        </Button>
      </Form>
    );
}

export default SignUp;