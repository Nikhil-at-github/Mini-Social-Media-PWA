import React,{useState} from 'react';
import axios from 'axios'
import { Row, Col, Button, Modal, Form, Image, InputGroup} from 'react-bootstrap';
import Icon from '../../Images/Add Icon.png';
import './AddPostButton.css';
import { useHistory } from "react-router-dom";
import AddPostModal from '../../components/Modal/Addpost';

export default function AddPostButton() {
  let history = useHistory();    
  // const [title, setTitle] = useState('');
  // const [paragraph, setParagraph] = useState('');
  // const [status, setStatus] = useState('public');
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  let name = localStorage.getItem('name');
  let email = localStorage.getItem('email');

  const addPost = (title, paragraph, status) => {
    let request = {
      title: title, 
      body: paragraph,
      status: status,
      owner: email,
    }
    console.log('DATA DEKHO ON SUBMIT PE ------------->', request);
    if (request.title === '' || request.body === '' || request.status === '' )
    {
      alert('please fill all the fields to Proceed');
    }
    else if(window.confirm('Are you sure, you want to Publish?')){
        alert('Your Post Is Published!');
        handleClose();
        axios.post('http://localhost:5000/postadded', request)
        .then(res => {
          if (res.status === 200) {
            console.log("POST ADD request DONE! ----------->")
            alert(res.data.message);
            console.log("DATA JO VAPAS AAYA hai BACKEND SE =================>>>", res.data.data);
            // console.log("DATA JO VAPAS AAYA hai BACKEND SE malikkkk k dwaraaaaa kitne post hai !!! =================>>>", res.data.allposts);
            if (res.data.message === 'Post Added Successfully') {
              history.push('/mypost');
            }
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
  }
 

  return (
    <>
      <Button className="Button-styling" onClick={handleShow}>
                <Image        
                src={Icon}
                width="75"
                height="75"
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
                <span className="tooltiptext">Add A Post</span>
      </Button>
      <AddPostModal handleClose= {handleClose} handleShow = {handleShow} addPost = {addPost} show={show}/>

</>    
  )
                  }
