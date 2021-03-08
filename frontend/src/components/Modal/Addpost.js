import React,{useState, useEffect} from 'react';
import axios from 'axios'
import { Row, Col, Button, Modal, Form, Image, InputGroup} from 'react-bootstrap';
import Icon from '../../Images/Add Icon.png';
// import './AddPostButton.css';
import { useHistory } from "react-router-dom";

export default function AddPostModal({prefilledData, handleShow, handleClose, addPost, show}) {
  let history = useHistory();    
  const [title, setTitle] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [status, setStatus] = useState('public');
  const [ID, setID] = useState('');
  
  let name = localStorage.getItem('name');
  let email = localStorage.getItem('email');

  useEffect(()=> {
      console.log("prefilledData Dikhaoo ===", prefilledData)
      if(prefilledData)
      {
        setTitle(prefilledData.title);
        setParagraph(prefilledData.body);
        setStatus(prefilledData.status);
        setID(prefilledData._id);
      }
  },[prefilledData])

  const submitModal = (e) => {
      e.preventDefault();
      addPost(title, paragraph,status,ID);
  }

  return (          
  <Modal
            show={show}
            size="lg"
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            // aria-labelledby="contained-modal-title-vcenter"
            centered
            >
                <Modal.Header closeButton>
                <Modal.Title>Add A Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* ADD a Form Here */}
                    <Form>
                        <Form.Group>
                            <Form.Label size="lg">Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter Title of your Post..." value={title} onChange={(e) => setTitle(e.target.value)}/>
                        </Form.Group>
  
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Label>Summary</Form.Label>
                          <Form.Control as="textarea" rows="4" placeholder="Explain your Post..." value={paragraph} onChange={(e) => setParagraph(e.target.value)}/>
                        </Form.Group>
    
                        <Form.Group as={Row}>
                        <Form.Label as="legend" column sm={2}>
                            Choose Status
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Check 
                            type="radio"
                            label="public"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios1"
                            value={status} onChange={() => setStatus('public')}
                            />
                            <Form.Check
                            type="radio"
                            label="private"
                            name="formHorizontalRadios"
                            id="formHorizontalRadios2"
                            value={status} 
                            onChange={() => setStatus('private')}
                            />
                        </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" 
                onClick={() => { if (window.confirm('Are you sure, you want to quit?')) handleClose() } }
                // onClick={() => 
                //     alert('Are you sure, you want to quit?').
                //     handleClose
                // }
                //  }
                 >
                    Close
                </Button>
                <Button type='button' variant="primary" onClick={(e) => submitModal(e) }>Post</Button>
                </Modal.Footer>
            </Modal> 
  )
                  }
