import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import firebase, { auth, provider } from '../../../firebase';
import { useHistory } from 'react-router';
//import { authenticationservice } from '../../../_services/authentication.service'; 

//const { classes } = props;
//const { username, setUsername } = useState('');
//const { password, setPassword } = useState('');

function Login(props) {

	const { classes } = props;
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
	const [password, setPassword] = useState('');

  async function login() {
    try {
      //await authenticationservice.login(email, password);
      
      auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        //if(user.email="")
        //{
        history.push('/dashboard');
        //}
        
        //this.setState({user});
      });

      
    } catch (error) {
      alert(error.message);
    }
  }

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" onChange={e => setEmail (e.target.value)} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password"  onChange={e => setPassword(e.target.value)} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={login}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }


export default Login;
