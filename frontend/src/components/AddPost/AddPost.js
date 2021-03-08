import React,{useState} from 'react';
import Navigation from '../Navigation/Navigation';
import { Row, Col, Button, Modal, Form  } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

export default function AddPost() {
    let history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Navigation/>

        <Button variant="secondary" onClick={handleShow}>
        Launch static backdrop modal
        </Button>
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
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter Title of your Post..." />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Paragraph</Form.Label>
                        <Form.Control type="password" placeholder="Explain your Post..." />
                    </Form.Group>

                    <Form.Group as={Row}>
                    <Form.Label as="legend" column sm={2}>
                        Choose Status
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Check
                        type="radio"
                        label="Public"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        />
                        <Form.Check
                        type="radio"
                        label="Private"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        />
                        <Form.Check
                        type="radio"
                        label="Save as Draft"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios3"
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
            <Button type='submit' variant="primary" onClick={() => { if (window.confirm('Are you sure, you want to Publish?')){
                alert('Your Post Is Published!');
                history.push('/mypost');
            }
              } }>Post</Button>
            </Modal.Footer>
        </Modal>

        </>
    )
}
