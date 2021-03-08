import React,{useState} from 'react';
import { Container, Row, Image, Col, Card, Button,Carousel } from 'react-bootstrap';
import Navigation from '../Navigation/Navigation';
import Cards from '../Cards/Cards'
import axios from 'axios';
import AddPostButton from '../../utils/AddPostButton/AddPostButton';



export default function Explore() {
    const [showAllPost, setShowAllPost] = useState(false);
    const [allposts, setAllPosts] = useState([]);

    const showPosts = () => {
        // console.log(response);
        setShowAllPost(true);
        axios.get('http://localhost:5000/allpost')
          .then(res => {
            if (res.status === 200) {
              console.log("API WORKIG ALL POSTS ARE HERE <<<>>>>>>>>>>>>>>>>>>>>>>>>><<>>>>>>>>>>>>>>>>>>>>")
              alert(res.data.message);
              console.log("Response recived from Backend =================>>>", res.data);
              console.log("Data recived from Backend =================>>>", res.data.data);
            //   allposts = res.data.data;
              setAllPosts(res.data.data);
              console.log('After clicking',showAllPost);
            }
            else{
                console.log("API Not WORKIG (STATUS CODE ERROR!!!!!!) <<<>>>>>>>>>>>>>>>>>>>>>>>>><<>>>>>>>>>>>>>>>>>>>>")
            }
          })
          .catch(err => {
            console.log(err);
          })
      }
    
    return (
        <>
        <Navigation/>
        <AddPostButton/>
        
        <Container>
        <Row style={{marginTop: '1rem', textAlign: "center", justifyContent: 'center' }}>
            <Col>
            <h2 style={{textDecoration: 'overline', color: "white"}}>Explore Section</h2>
            </Col>
        </Row>
        {/* <Button type='submit' className="btn-float" onClick={(e) => showPosts()}>
             Show All Posts 
        </Button> */}
        <Cards/>
        </Container>
        </>
    )
}
 