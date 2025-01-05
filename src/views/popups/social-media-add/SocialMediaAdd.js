import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./SocialMediaAdd.css"

const AddSocialMedia = () => {
  const [show, setShow] = useState(false);
const [socialMedia,setSocialMedia] = useState({
    facebook:"",
    twitter:"",
    instagram:"",
    youtube:""
})


const handleFormChange = (e)=>{
    const {name,value} = e.target
    setSocialMedia({...socialMedia,[name]:value})
}

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSave = () => {
   
    // Add your save logic here
    setShow(false);
  };

  return (
    <>
      {/* Button to open modal */}
      <Button variant="primary" onClick={handleShow}>
        Add New Store
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Store</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBrandName">
              <Form.Label>Facebook</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand name"
                value={StoreName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBrandName">
              <Form.Label>Twitter</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand name"
                value={StoreName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBrandName">
              <Form.Label>Instagram</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand name"
                value={StoreName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBrandName">
              <Form.Label>Youtube</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand name"
                value={StoreName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </Form.Group>
         
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddSocialMedia;
