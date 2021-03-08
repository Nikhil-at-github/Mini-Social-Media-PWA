import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Container, Row, Image, Col, Card, Button,Carousel } from 'react-bootstrap';
import Avatar from '../../Images/Avatars (2).png';
import Moment from 'react-moment';
import AddPostModal from '../../components/Modal/Addpost';
import { useHistory } from "react-router-dom";

export default function MypostCards() {
    let history = useHistory();  
    const [data, setdata] = useState([]);
    const [currentItem, setcurrentItem] = useState({})
    let loggedinuser = localStorage.getItem('email');
    let [update, setupdate] = useState(false);
    let email = localStorage.getItem('email');
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    useEffect(() => {
        updateMyPosts();
    }, []); 

    let updateMyPosts = (params) => {
        axios.get('http://localhost:5000/mypost',{
            params: {
              USER: loggedinuser
            }
          })
        .then(res => {
        setdata(res.data.data);
        })
        .catch(err => {
        console.log(err);
        })
    }

    console.log('Email dekhlo --------------- >> ',loggedinuser)
    console.log('data fronm backend >>>>>>>>>>>>>>>>>>>>>>>>> ',data)

    const UpatePost = (title, paragraph, status,ID) => {
        let request = {
            title: title, 
            body: paragraph,
            status: status,
            owner: email,
            _id:ID
        }
        console.log('DATA DEKHO ON SUBMIT PE ------------->', request);
        if (request.title === '' || request.body === '' || request.status === '' )
        {
          alert('please fill all the fields to Proceed');
        }
        else if(window.confirm('Are you sure, you want to update the Post?')){
            alert('Your Post Is Updated!');
            handleClose();
            console.log("PosT Updated Successfully!!!!");
            axios.post('http://localhost:5000/editpost', request)
            .then(res => {
              if (res.status === 200) {
                console.log("POST UPDATE request DONE! ----------->")
                alert(res.data.message);
                console.log("DATA JO VAPAS AAYA hai BACKEND SE =================>>>", res.data.data);
                if (res.data.message === 'Post Updated Successfully') {
                    updateMyPosts();
                }
              }
            })
            .catch(err => {
              console.log(err);
            })
          }
      }
    
    //Delete a Post  
    let DeletePost = (item) => {
            console.log("Delete onclick pe data jo jo aya hai!!!",item);
            if(window.confirm('Are you sure, you want to quit?')){
                let post = item;
                axios.post('http://localhost:5000/deletepost', post)
                    .then(res => {
                    console.log("Delete Request Done!!!",res.data);
                    alert(res.data.message);
                    updateMyPosts();
                    //   window.location.reload(false);
                    //   setdata(res.data.data);
                    })
                    .catch(err => {
                    alert("Something Went Wrong!!")
                    console.log(err);
                    })    
            }
            // prompt(Are yoy sure, you want to Delete this Post?);
            // alert('Are yoy sure, you want to Delete this Post?');
            // console.log("Delete onclick pe data jo jo aya hai!!!",item);
            // let post = {_id: item._id};
                
        }

    return (
        <>
        <Container style={{margin: 'auto' }}>
        <Row style={{marginTop: '1rem' }}>
            {data.map((item,index) => (
                 <Col xs={12} md={6} lg={4} style={{marginTop: '1rem',marginBottom:'1rem' }}>
                    <Card className="text-center" >
                        <Card.Header>
                            <Button variant="secondary" className="mr-2" onClick={() => {handleShow(); setcurrentItem(item)}}
                            >Edit</Button> 
                            <Button variant="primary" className="mr-2" onClick={() => DeletePost(item)}>Delete</Button>
                        </Card.Header>
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
                                cursor: "pointer"
                                }}
                        />
                        <Card.Body>
                            <Card.Text>Status : {item.status}</Card.Text>
                            <Card.Text>{item.owner}</Card.Text>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>{item.body}</Card.Text>
                            <Button variant="primary" className="mr-2">Like</Button>
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
        <AddPostModal prefilledData ={currentItem} handleClose= {handleClose} handleShow = {handleShow} addPost = {UpatePost} show={show}/>
        {/* { update === true ? <AddPostButton /> : null } */}
        </>
    )
}
