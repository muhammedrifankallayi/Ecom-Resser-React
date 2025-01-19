import React, { useState,useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import Axioscall from "../../../services/axios";
import toast from "react-hot-toast";

const AddSubCategoryModal = ({isOpen,onClose}) => {
  const [show, setShow] = useState(false);
  const [category, setcategory] = useState("");
  const [mainCategory, setManiCategory] = useState("");
  const [MaincategoryList, setMainCategoryList] = useState([]);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);


  useEffect(()=>{
    getAllCategory();
    },[])

const getAllCategory = async() => {
 await Axioscall("get", "/seller/mainCategory", null, true).then((res) => {
   setMainCategoryList(res.data.data);
 });
}





  const handleSave = async() => {
   
   await Axioscall(
     "post",
     "/seller/subCategory",
     { subCategory: category, categoryId: mainCategory },
     true
   ).then((res) => {
     if (res.data.success) {
       toast.success("saved successfully");
       onClose();
     }
   });
    setShow(false);
  };

  return (
    <>
      {/* Button to open modal */}
      <Button variant="primary" onClick={handleShow}>
        Add New SubCategory
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header >
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formcategory">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter brand name"
                value={category}
                onChange={(e) => setcategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBrandDescription">
              <Form.Label>Main Category</Form.Label>
              <Select 
              defaultValue={mainCategory}
               options={MaincategoryList.map((item) => ({ label: item.category,value: item._id}))}  
             
                onChange={(selectedOption) => {
                    setManiCategory(selectedOption?.value)
                }}   placeholder="Choose" />

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

export default AddSubCategoryModal;
