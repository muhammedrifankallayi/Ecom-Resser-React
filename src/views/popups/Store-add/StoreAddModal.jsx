import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./StoreAddModal.css"

const AddStoreModal = () => {
  const [show, setShow] = useState(false);
  const [StoreName, setStoreName] = useState("");
  const [StoreDetails, setStoreDetails] = useState("");

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
              <Form.Label>Store Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand name"
                value={StoreName}
                onChange={(e) => setStoreName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBrandDescription">
              <Form.Label>Store Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter brand description"
                value={StoreDetails}
                onChange={(e) => setStoreDetails(e.target.value)}
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

export default AddStoreModal;
