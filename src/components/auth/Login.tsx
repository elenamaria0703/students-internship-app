import React, { useState , useContext, useEffect} from 'react';

import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { AccountContext } from '../../providers/AccountProvider';

const Login: React.FC =()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmation, setConfirmation]= useState('');

    const {authenticate,authenticationError} = useContext(AccountContext);

    const onSubmit = (event: { preventDefault: () => void; }) =>{
        event.preventDefault();
        if(confirmation!==''){
            authenticate?.(email,password,confirmation);
            setConfirmation('');
        }else{
            authenticate?.(email,password);
        }
    }

    useEffect(()=>{
        console.log("auth error", authenticationError);
    },[authenticationError])

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
        <hr/>
        
        {authenticationError && authenticationError.message === "User is not confirmed." && 
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Alert variant="info">
              <p>Your account is not confirmed. Check your email for the confirmation code and submit it with your credentials!</p>
            </Alert>
            <Form.Label column sm="2">
              Code
            </Form.Label>
            <Col sm="10">
              <Form.Control type="text" value={confirmation} placeholder="Confirmation Code" onChange={event=>setConfirmation(event.target.value)} />
            </Col>
          </Form.Group>
        }

        {authenticationError && authenticationError.message === "Incorrect username or password." && 
          <div>
            <Alert variant="danger">
              {authenticationError.message}
            </Alert>
          </div>
        }

        <Button variant="secondary" type="submit">
          Login
        </Button>
      </Form>
    );
}

export default Login;