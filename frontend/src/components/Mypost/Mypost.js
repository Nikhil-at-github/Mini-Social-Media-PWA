import React from 'react';
import Navigation from '../Navigation/Navigation';
import { Container, Row, Image, Col, Card, Button,Glyphicon } from 'react-bootstrap';
import Icon from '../../Images/Add Icon.png';
import AddPostButton from '../../utils/AddPostButton/AddPostButton';
import MypostCards from '../Cards/MypostCards'

export default function Mypost() {

    return (
        <>
            <Navigation/>
            <AddPostButton/>
            <Container>
                <Row style={{marginTop: '1rem', textAlign: "center", justifyContent: 'center' }}>
                    <Col>
                    <h2 style={{textDecoration: 'overline', color: "white"}}>All My Posts</h2>
                    </Col>
                </Row>
                <MypostCards/>
            </Container>
        </>
    )
}
