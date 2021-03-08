import React, {useState} from 'react'
// import axios from 'axios';
// import { Container, Row, Image, Col, Card, Button } from 'react-bootstrap';
import headerImage from '../../Images/react logo.jpg';
import Avatar from '../../Images/Avatars (2).png';
import Navigation from '../Navigation/Navigation';
import Cards from '../Cards/Cards';
import AddPostButton from '../../utils/AddPostButton/AddPostButton';
import { Container,Row, Col } from 'react-bootstrap';

export default function Dashboard({ history }) {
    // let name = localStorage.getItem('name');
    // let email = localStorage.getItem('email');
    // let token = localStorage.getItem('token');
    return (
        <>
            <Navigation/>
            <AddPostButton/>
            <Container>
                <Row style={{marginTop: '1rem', textAlign: "center", justifyContent: 'center' }}>
                    <Col>
                    <h2 style={{textDecoration: 'overline', color: "white"}}>All Public Featured Posts</h2>
                    </Col>
                </Row>
                <Cards/>
            </Container>
            
        </>
            )
}
