import React,{useState} from 'react';
import { Container, Row, Image, Col, Card, Button, Grid, Navbar, Nav, Form, FormControl,NavDropdown } from 'react-bootstrap';
import headerImage from '../../Images/react logo.jpg';
import logo from '../../Images/logo1.png';
import Avatar from '../../Images/Avatars (2).png';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import './Navigation.css';
import EditProfile from '../../utils/EditProfile/EditProfile';

export default function Navigation() {

    let name = localStorage.getItem('name');
    let email = localStorage.getItem('email');
    let token = localStorage.getItem('token');
    let history = useHistory()

    const [showProfile, setShowProfile] = useState(false);
    const [activeNavbar, setactiveNavbar] = useState('')
    const logout = () => {
        if (token) {
            console.log('LogOUTTTTTTT Bolte +++++++++>', token)
            axios.post('http://localhost:5000/logout',
                {},
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }).then(res => {
                    console.log("LOGOUT request DONE! ------------------------------->Logout")
                    alert(res.data.message);
                    console.log("Logout Part =================>", res.data);
                    history.push('/')

                    localStorage.removeItem('name');
                    console.log("Logout Pe name  =================>", name);
                    
                    localStorage.removeItem('email');
                    console.log("Logout Pe email  =================>", email);
                    
                    localStorage.removeItem('token');
                })
        }
    }
    console.log('Current navbar ------------->',activeNavbar)
    // console.log("history======================", history)
    function refreshPage() {
        window.location.reload(true);
      }
    return (
        <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="" onClick={(e) => {
                history.push('/dashboard');  
                refreshPage()
                setactiveNavbar('My Feed')
                } 
            }>
                <img
                    src={headerImage}
                    width="60"
                    height="60"
                    className="d-inline-block align-top"
                    alt="Main logo"
                    style={{marginLeft: "3rem", marginRight: "1.5rem"}}
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link className={activeNavbar === 'My Feed' ? "active" : "" }
                    onClick={(e) => {
                        setactiveNavbar('My Feed')
                        history.push('/dashboard');
                        }
                    }> My Feed </Nav.Link>
                </Nav>
                <Nav className="mr-auto">
                    <Nav.Link className={activeNavbar === 'Explore' ? "active" : "" }
                    onClick={(e) => {
                        setactiveNavbar('Explore')
                        history.push('/explore')
                        }
                    }> Explore </Nav.Link>
                </Nav>
                <Nav className="mr-auto">
                    <Nav.Link className={activeNavbar === 'My Timeline' ? "active" : "" }
                    onClick={(e) => {
                        setactiveNavbar('My Timeline')
                        history.push('/mypost')
                        }
                    }> My Timeline </Nav.Link>
                </Nav>
                <Nav className="mr-auto">
                    <Form inline style={{margin:'0rem 3rem' }}>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                </Nav>
                <Nav className="mr-3">         
                    { showProfile && (
                        <NavDropdown id="collasible-nav-dropdown" show style={{ marginLeft:'1rem', marginRight:'2rem'}}>
                                {/* <EditProfile/> */}
                            <NavDropdown.Item href="#">
                                <EditProfile/>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#">
                                <Button color="secondary" onClick={() => logout()}> Logout </Button>
                            </NavDropdown.Item>
                        </NavDropdown>
                    )}
                    <Image src={Avatar}
                        width="75"
                        height="75"
                        className="d-inline-block align-top"
                        alt="Avatar" 
                        style={{
                            cursor: "pointer"
                        }}
                        onClick={() => {
                            showProfile ? setShowProfile(false) : setShowProfile(true)                   
                        }}
                    />
                </Nav>    
            </Navbar.Collapse>
        </Navbar>
    )
}

