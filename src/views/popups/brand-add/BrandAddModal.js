import React, { useState,useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import Axioscall from "../../../services/axios";
import toast from "react-hot-toast";

const AddBrandModal = ({onClose,data}) => {
  const [show, setShow] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  useEffect(()=>{
    getAllCategory();
    },[])

const getAllCategory = async() => {
 await Axioscall("get", "/subCategory",null,true).then((res) => {
  setCategoryList(res.data.data)
 })
}





  const handleSave = async() => {

   await Axioscall("post", "/brand",{brand:brandName,category:category},true).then((res) => {
        if(res.data.success){
            toast.success("saved successfully");
            onClose()
        }
      });
    setShow(false);
  };

  return (
    <>
      {/* Button to open modal */}
      <Button variant="primary" onClick={handleShow}>
       Add Brand
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header >
          <Modal.Title>Add Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBrandName">
              <Form.Label>Brand Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand name"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBrandDescription">
              <Form.Label>Category</Form.Label>
              <Select options={categoryList.map((item)=>({label:item.subCategory,value:item._id}))}     defaultValue={category}    onChange={(e) => setCategory(e?.value)}   placeholder="Choose" />
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

export default AddBrandModal;
