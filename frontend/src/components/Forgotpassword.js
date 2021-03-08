import React,{useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './Login.css';
import { Container, Row, Image, Col, Card, Button } from 'react-bootstrap';
import Image1 from '../Images/Side1.png';
// import logo from '..Images/sid'; 

export default function Forgotpassword({ history }) {
    const [email, setEmail] = useState('');
    const reset = (e) => {
        e.preventDefault();
        let request = {
            username: email
        }
        axios.post('http://localhost:5000/resetpassword', request)
            .then(res => {
                if (res.status == 200) {
                    console.log("reset request Sent! ------------->")
                    alert(res.data.message);
                    console.log("DATA FROM BACKEND =================>", res.data.message);
                    localStorage.setItem("token", res.data.token)
                    //clear Fields after Login 
                    setEmail('');
                    history.push('/')
                    }
                else if(res.status == 203){
                    console.log("reset request Sent! -------------> BUT USER NOT FOUND",res.data)
                    alert(res.data.message);
                    console.log("DATA FROM BACKEND =================>", res.data.message);
                    //clear Fields after Login 
                    // history.push('/')
                    }    
                }
            ).catch(err => {
                console.log(err);
            })
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
                                <Col lg={6} className="col-lg-6 d-none d-lg-block">
                                    <Image src={Image1} style={{ height: "100%", width: "100%" }} />
                                </Col>
                                <Col lg={6}>
                                    <div className="p-5 mt-5">
                                        <div className="text-center">
                                        <h4 className="mb-4" style={{color: "#3a3b45"}}>Forgot Your Password?</h4>
                                        <p className="mb-4" style={{color: "#858796"}}>We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password!</p>
                                        </div>
                                        <form className="user" onSubmit={(e) => reset(e)}>
                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-user" id="exampleInputEmail" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            </div>  
                                            <Button type='submit' className="btn-primary btn-user btn-block"> Reset Password </Button> 
                                            <hr />   
                                        </form>
                                        <div className="text-center">
                                            <a className="small" onClick={(e) => history.push('/Register')}>Create an Account!</a>
                                        </div>
                                        <div className="text-center">
                                            <a className="small" onClick={(e) => history.push('/')}> Already have an account? Login!</a>
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
