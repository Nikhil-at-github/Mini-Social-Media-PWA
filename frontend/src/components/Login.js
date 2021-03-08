import React, { useState, useContext, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './Login.css';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { Container, Row, Image, Col, Card, Button } from 'react-bootstrap';
import Image1 from '../Images/Side.png';

export default function Login({ history }) {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const myRef = useRef();

  const login = (e) => {
    e.preventDefault();
    let request = {
      username: username,
      password: password
    }
    axios.post('http://localhost:5000/login', request)
      .then(res => {
        if (res.status === 200) {
          console.log("LOGIN request DONE! ------->")
          alert(res.data.message);
          console.log("nhjjjjjjjjjjjjjjjjjjj=================?", res.data.data);
          //clear Fields after Login 
          setPassword('');
          setUsername('');
          if (res.data.message === 'Successful login!') {
            // setUserData(res.data.data);
            console.log("tokennnnn============>", res.data.token);
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("name", res.data.data[0].name)
            localStorage.setItem("email", res.data.data[0].username)
            history.push('/dashboard')
          }
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const responseGoogle = (response) => {
    console.log(response);
    setName(response.profileObj.name);
    setUsername(response.profileObj.email);
    let request = {
      name: response.profileObj.name,
      username: response.profileObj.email
    }
    axios.post('http://localhost:5000/googlelogin', request)
      .then(res => {
        if (res.status === 200) {
          console.log("Google LOGIN request sent! <<<>>>>>>>>>>>>>>>>>>>>>>>>><<>>>>>>>>>>>>>>>>>>>>")
          alert(res.data.message);

          console.log("Data recived from Backend =================>>>", res.data.data);

          if (res.data.message === 'Successful Login!' || res.data.message === 'Successful SignUp!') {
            // setUserData(res.data.data);

            localStorage.setItem("token", res.data.token)
            // console.log("tokennnnn============>", res.data.token);

            localStorage.setItem("name", res.data.data[0].name)
            // console.log("name============>", res.data.data[0].name);

            localStorage.setItem("email", res.data.data[0].username)
            // console.log("usename============>", res.data.data[0].username);

            history.push('/dashboard');
          }
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const responseFacebook = (response) => {
    console.log(response);
  }

  return (
    <Container>
      {/* <!-- Outer Row --> */}
      <Row className="row justify-content-center">
        <Col className="col-xl-10 col-lg-12 col-md-9">
          <Card className="card o-hidden border-0 shadow-lg my-5">
            <Card.Body className="card-body p-0">
              {/* <!-- Nested Row within Card Body --> */}
              <Row>
                <Col lg={6} >
                  <Image src={Image1} style={{ height: "100%", width: "100%" }} />
                </Col>
                <Col lg={6}>
                  <div className="p-5 mt-5">
                    <div className="text-center">
                      <h4 className="mb-4" style={{ color: "#3a3b45" }}>Welcome Back!</h4>
                    </div>
                    <form className="user" onSubmit={(e) => login(e)}>
                      <div className="form-group">
                        <input type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." value={username}
                          onChange={(e) => setUsername(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <input type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" value={password}
                          onChange={(e) => setPassword(e.target.value)} />
                      </div>
                      <div className="form-group">
                        {/* <div className="custom-control custom-checkbox small">
                          <input type="checkbox" className="custom-control-input" id="customCheck" />
                          <label className="custom-control-label" for="customCheck">Remember Me</label>
                        </div> */}
                      </div>
                      <Button type='submit' className="btn btn-primary btn-user btn-block" >Login</Button>
                      {/* <a href="index.html" className="btn btn-primary btn-user btn-block">
                      Login
                    </a> */}
                      <hr />
                      {/* <a className="btn btn-google btn-user btn-block" >
                        <i className="fab fa-google fa-fw"></i> Login with Google
                    </a> */}
                     
                    {/* <FacebookLogin
                        appId="311919463287617"
                        autoLoad={true}
                        fields="name,email,picture"
                        // onClick={componentClicked}
                        callback={responseFacebook}
                        cssClass="btn btn-facebook btn-user btn-block"
                        icon="fa fa-facebook"
                      />     */}

                      {/* <a className="btn btn-facebook btn-user btn-block" onClick={() => {
                        }}>
                        <i className="fab fa-facebook-f fa-fw"></i> Login with Facebook
                      </a> */}
                    </form>
                    <div style={{textAlign: 'center'}}>
                    <GoogleLogin
                          clientId="1067825300134-1fb0lmdgiidqnrb3abur2lv3nq41p83r.apps.googleusercontent.com"
                          buttonText="Login with Google"
                          // render={renderProps => (
                          //   <button className="btn btn-google btn-user btn-block">
                          //   <i className="fa fa-google"></i>
                          //     Login with Google
                          //   </button>
                          // )}
                          onSuccess={responseGoogle}
                          onFailure={responseGoogle}
                          cookiePolicy={'single_host_origin'}
                        />
                      </div>
                    <hr />
                    <div className="text-center">
                      <a className="small" onClick={(e) => history.push('/forgetpassword')}>Forgot Password?</a>
                    </div>
                    <div className="text-center">
                      <a className="small" onClick={(e) => history.push('/Register')}>Create an Account!</a>
                    </div>
                  </div>
                </Col>

              </Row>
            </Card.Body>

          </Card>


        </Col>
      </Row>


    </Container>

  )
}
