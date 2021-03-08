import React,{useState} from 'react';
import axios from 'axios'
import { Row, Col, Button, Modal, Form, Image, InputGroup} from 'react-bootstrap';
import Icon from '../../Images/pencil.png';
import './EditProfile.css';
import { useHistory } from "react-router-dom";

export default function EditProfile() {
  let history = useHistory();    
  let name = localStorage.getItem('name');
  let email = localStorage.getItem('email');

  const [editedname, seteditedname] = useState(name);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const update = (e) => {
    e.preventDefault();
    let request = {
        email:email,
        name:editedname
    }
    console.log('DATA DEKHO ON SUBMIT PE ------------->',request);
    if (request.name === '')
    {
      alert('please fill all the fields to Proceed');
    }
    else if(window.confirm('Are you sure, you want to Update?')){
        alert('Your Profile is Updated!');
        handleClose();
        axios.post('http://localhost:5000/profileupdate', request)
        .then(res => {
          if (res.status === 200) {
            console.log("Name Update request DONE! ----------->")
            alert(res.data.message);
            console.log("DATA JO VAPAS AAYA hai BACKEND SE =================>>>", res.data.data);
            // console.log("DATA JO VAPAS AAYA hai BACKEND SE malikkkk k dwaraaaaa kitne post hai !!! =================>>>", res.data.allposts);
            if (res.data.message === 'Data Updated Successfully') {
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
      
      <Button className="btnnnn" onClick={handleShow}>
                <Image        
                src={Icon}
                width="40"
                height="40"
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
                Edit Profile
                <span className="tooltiptext">Edit Profile</span>
                
      </Button>
            <Modal
            show={show}
            size="lg"
            onHide={handleClose}
            backdrop="static"
            // keyboard={false}
            // aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton>
                <Modal.Title>Edit You Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="form-group row">
                        <Col>
                            <input type="text" className="form-control form-control-user" id="exampleFirstName" placeholder="Name" value={editedname} onChange={(e) => seteditedname(e.target.value)}/>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                <label for="img">Choose an image:</label>
                <input type="file" id="img" name="img" accept="image/*" />
                <Button variant="secondary" 
                onClick={() => { if (window.confirm('Are you sure, you want to quit?')) handleClose() } }
                 >
                    Close
                </Button>
                
                <Button type='button' variant="primary" onClick={(e) => update(e) }>Update</Button>
                </Modal.Footer>
            </Modal>
</>    
  )
                  }
