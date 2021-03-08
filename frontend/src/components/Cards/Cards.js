import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Container, Row, Image, Col, Card, Button,Carousel } from 'react-bootstrap';
import Avatar from '../../Images/Avatars (2).png';
import Moment from 'react-moment';

export default function Cards() {
    const [data, setdata] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/allpost')
        .then(res => {
        setdata(res.data.data);
        }).catch(err => {
        console.log(err);
        })
    }, []); 
    
    console.log('data fronm backend _________>>>>>>>>>>> --------------- >> ',data)
    // console.log('date --------------- >> ',date)


    return (
        <>
        <Container style={{margin: 'auto' }}>
        {/* <Row style={{marginTop: '1rem' }}>
            <Col>
            <h2 style={{textDecoration: 'overline', color: "white"}}>All Public Featured Posts</h2>
            </Col>
        </Row> */}
        <Row style={{marginTop: '1rem' }}>

            {data.map((item,index) => (
                 <Col xs={12} md={6} lg={4} style={{marginTop: '1rem',marginBottom:'1rem' }}>
                 <Card className="text-center" style={{ cursor:'unset'}}>
                 {/* <Card.Header>Featured</Card.Header> */}
                 <Image         
                     src={Avatar}
                     width="150"
                     height="150"
                     className="align-top"
                     alt="Avatar" 
                     roundedCircle
                     style={{
                         display: 'block',
                         marginLeft: 'auto',
                         marginRight: 'auto',
                        //  cursor: "pointer"
                         }}
                 />
                 <Card.Body>
                    <Card.Text>{item.owner}</Card.Text>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.body}</Card.Text>
                    <Button variant="primary" className="mr-2" >Like</Button>
                    <Button variant="primary">Share to my timeline</Button>
                 </Card.Body>
                 <Card.Footer className="text-muted">
                    <Moment format="DD-MM-YYYY HH:mm">
                        {item.createdAt}
                    </Moment>
                     </Card.Footer>
                 </Card>
             </Col>
 
            ))}
           
            </Row>
        
        </Container>
        </>
    )
}
