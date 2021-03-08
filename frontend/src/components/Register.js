import React, {useState, useContext, useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './Register.css';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import Image3 from '../Images/SidImage (1).png';
import { Container, Row, Image, Col, Card, Button } from 'react-bootstrap';

export default function Register({ history }) {
    const [name, setName] = useState('');
    // const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');

    const responseGoogle = (response) => {
      console.log(response);
      // setFirstname(response.profileObj.name);
      // setLastname(response.profileObj.name);
      setName(response.profileObj.name);
      setUsername(response.profileObj.email);
      let request = {
        name: response.profileObj.name,
        username: response.profileObj.email
      }
      axios.post('http://localhost:5000/googlelogin', request)
        .then(res => {
          if (res.status === 200) {
            console.log("Google LOGIN request DONE! <<<>>>>>>>>>>>>>>>>>>>>>>>>><<>>>>>>>>>>>>>>>>>>>>")
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

    const signup = (e) => {
      e.preventDefault();
      if (password === confirmpassword) {
          let request = {
              // firstname: firstname,
              // lastname: lastname, 
              name: name,
              username: username,
              password: password
          }
          axios.post('http://localhost:5000/signup', request)
              .then(res => {
                  console.log("SIGN UP HOGAYA! ------->")
                  alert(res.data.message);
                  console.log("DATA incomming =================>", res.data.data)
                  //clear Fields after SignUp 
                  setName('');
                  // setFirstname('');
                  // setLastname('');
                  setUsername('');
                  setPassword('');
                  setConfirmpassword('');
                  if (res.data.message === 'Successful signUp!') {
                      console.log("total Data after SignUp============>", res.data.data[0]);
                      // setUserData(res.data.data);
                      console.log("tokennnnn============>", res.data.token);
                      localStorage.setItem("token", res.data.token)
                      localStorage.setItem("name", res.data.data[0].name)
                      console.log("tokennnnn============>",  res.data.data[0].name);
                      localStorage.setItem("email", res.data.data[0].username)
                      history.push('/dashboard')
                  }
              })
              .catch(err => {
                  console.log(err);
              })
      }
      else {
          alert("password not matched!");
      }
  }

    return (
    <Container>
    {/* <!-- Outer Row --> */}
        <Card className="card o-hidden border-0 shadow-lg my-5">
          <Card.Body className="card-body p-0">
            {/* <!-- Nested Row within Card Body--> */}
            <Row>
              <Col lg={5} className='d-none d-lg-block'>
                <Image src={Image3} style={{height:"100%", width:"100%"}}/>
              </Col>
              <Col lg={7}>
                <div className="p-5 mt-5"> 
                  <div className="text-center">
                    <h4 className="mb-4" style={{color: "#3a3b45"}}>Create an Account!</h4>
                  </div>
                  <form className="user" onSubmit={(e) => signup(e)}>
                    <Row className="form-group row">
                        <Col>
                            <input type="text" className="form-control form-control-user" id="exampleFirstName" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </Col>
                        {/* <Col className="col-sm-6">
                        <input type="text" className="form-control form-control-user" id="exampleLastName" placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                        </Col> */}
                    </Row>
                    <div className="form-group">
                        <input type="email" className="form-control form-control-user" id="exampleInputEmail" placeholder="Email Address" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <Row className="form-group row">
                        <Col sm={6} className="col mb-3 mb-sm-0">
                            <input type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>    
                        </Col>
                        <Col className="col-sm-6">
                            <input type="password" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Repeat Password" value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)}/>
                        </Col>
                    </Row>
                    <Button type='submit' className="btn btn-primary btn-user btn-block" >Register Account</Button>
                    {/* <a href="login.html" className="btn btn-primary btn-user btn-block">
                    Register Account
                    </a> */}
                    <hr/>
                    {/* <a href="index.html" className="btn btn-google btn-user btn-block">
                    <i className="fab fa-google fa-fw"></i> Register with Google
                    </a>
                    <a href="index.html" className="btn btn-facebook btn-user btn-block">
                    <i className="fab fa-facebook-f fa-fw"></i> Register with Facebook
                    </a> */}
                  </form>
                  <div style={{textAlign: 'center'}}>
                    <GoogleLogin
                          clientId="1067825300134-1fb0lmdgiidqnrb3abur2lv3nq41p83r.apps.googleusercontent.com"
                          buttonText="Register with Google"
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
                     {/* <FacebookLogin
                        appId="311919463287617"
                        autoLoad={true}
                        fields="name,email,picture"
                        // onClick={componentClicked}
                        callback={responseFacebook}
                        cssClass="btn btn-facebook btn-user btn-block"
                        icon="fa fa-facebook"
                      />     */}
                  <hr/>
                  <div className="text-center">
                    <a className="small" onClick={(e) => history.push('/forgetpassword')}>Forgot Password?</a>
                  </div>
                  <div className="text-center">
                    <a className="small" onClick={(e) => history.push('/')}> Already have an account? Login!</a>
                  </div>
                </div>
                </Col>
              </Row>
          </Card.Body>
        
        </Card>


  </Container>

    )
}
