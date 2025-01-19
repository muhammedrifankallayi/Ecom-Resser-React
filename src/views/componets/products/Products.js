import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Axioscall from "../../../services/axios";
import toast from "react-hot-toast";
import Header from "components/Headers/Header";
import Select from "react-select";
import './Products.css'

function Products() {



  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track if editing
  const [editId, setEditId] = useState(null); // ID of reseller being edited
  const [Products, setProducts] = useState([]);
  const [brands, setBrands] = useState([])
  const [stores, setStores] = useState([])
  const [subcategories, setSubcategories] = useState([]);
  const [previewImg,setPreviewImg]=  useState('');
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    wholesalePrice: 0,
    retailPrice: 0,
    discountedPrice: 0,
    subCategory: "",
    isActive: true,
    files: [],
    brand:"",
    description:"",
    store:""
  });

  // Reset modal form
  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      quantity: "",
      wholesalePrice: 0,
      retailPrice: 0,
      discountedPrice: 0,
      subCategory: "",
      isActive: true,
      files: [],
      brand:"",
      description:"",
      store:""
    });
    setIsEditing(false);
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    setFormData({ ...formData, [actionMeta.name]: selectedOption.value });
  };



  const getProducts = async () => {
    try {
      let data = await Axioscall("post", "/general/products", null, true);
      console.log(data.data.data, "Products...");
      setProducts(data.data.data);
    } catch (error) {
      console.error("Error fetching Products:", error);
    }
  };

  const handleClose = () => {
    setShow(false);
    resetForm();
  };

  const handleShow = () => setShow(true);

  const handleEdit = (item) => {
    // Populate modal form with reseller data
    setFormData({
      store: item.store,
      owner: item.owner,
      email: item.email,
      phone_number: item.phone_number,
      role: "seller",
      files: null,
    });
    setEditId(item._id);
    setIsEditing(true);
    setShow(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await Axioscall(
        "put",
        `/seller/store/${id}`,
        { action: "delete" },
        true
      );
      console.log(response, "Delete Response...");
      // setProducts(Products.filter((sub) => sub._id !== id));
      
      toast.success(response.data.message)

      getProducts()
    } catch (error) {
      console.error("Error deleting reseller:", error);
    }
  };


  const handleImageChange = (e) => {
    const files = e.target.files;
    console.log(files,"OPPP");
    
    if (files.length > 0) {
      setPreviewImg(URL.createObjectURL(files[0])) ;
      setFormData({
        ...formData,
        files: Array.from(files), // Store the actual file objects
      });
    }
  };




  useEffect(() => {
    getProducts();
    GetAllBrands();
    getAllSubCategory();
    getStore();
  }, []);



  const  GetAllBrands = async()=>{
        await Axioscall("get", "/seller/brand", null, true).then((res) => {
          setBrands(res.data.data);
        });
    }

    const getAllSubCategory = async() => {
      await Axioscall("get", "/seller/subCategory", null, true).then((res) => {
        setSubcategories(res.data.data);
      });
     }

       const getStore = async () => {
         try {
           let data = await Axioscall("get", "/seller/store", null, true);
           console.log(data.data.data, "Store...");
           setStores(data.data.data);
         } catch (error) {
           console.error("Error fetching Store:", error);
         }
       };



    const submit  = async()=> {
      try {
         try {
         const formDataData = new FormData();
         Object.keys(formData).forEach((key) => {
           if (key === "files") {
             formData[key].forEach((file) => {
               formDataData.append("files", file);
             });
           } else {
             formDataData.append(key, formData[key]);
           }
         });
          const response = await Axioscall(
            "post",
            "/general/product",
            formDataData,
            true
          ).then((res) => {
            toast.success("Saved Successfull");
            resetForm();
            getProducts();
            handleClose();
            console.log(formData);
          });
         
          
  
        } catch (error) {
          console.log(error.message);
          
        }
      
        
      } catch (error) {
        console.log(error.message);
        
      }
    }


  return (
    <div>
      <Header/>
      <div className="card mt-3">
        <div className="card-header">
          <div
            className="header-title"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>Products</span>
            <button onClick={handleShow} className="btn btn-outline-success">
              <i className="file-plus"></i> Add Product
            </button>
          </div>
        </div>
        <div className="card-body">
          <div id="yearly-sales-collapse" className="collapse show">
            <div className="table-responsive">
              <table className="table table-nowrap table-hover mb-0">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Image</th>
                    <th>Product</th>
                    <th>Price (W) </th>
                    <th>Price (R)</th>
                    <th>Price (D) </th>
                    <th>Category </th>
                    <th> Brand </th>
                    <th> Store </th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Products && Products.length > 0 ? (
                    Products.map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>
                          <img width={"50px"} height={"50px"} src={item?.images[0]} alt="Product" />
                        </td>
                        <td>{item?.name}</td>
                        <td>{item?.wholesalePrice}</td>
                        <td>{item?.retailPrice}</td>
                        <td>{item?.discountedPrice}</td>
                        <td>{item?.subCategory[0]?.subCategory}</td>
                        <td>{item?.brand[0]?.brand}</td>
                        <td>{item?.store[0]?.store}</td>
                        <td>
                          <span
                            className={`badge ${
                              item.isActive
                                ? "bg-info-subtle text-info"
                                : "bg-danger-subtle text-danger"
                            }`}
                          >
                            {item.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-success" style={{ padding: "4px", margin: "2px" }}>edit</button>
                          <button className="btn btn-danger" style={{ padding: "4px", margin: "2px" }}>delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No Products found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal show={show} onHide={handleClose}  >
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Form>
        
       <div  className="input-wraper" >
        <div className="img-container">
       {previewImg ? (
          <img
            src={previewImg} // Show the first files for preview
            alt="Selected Preview"
            style={{ width: "200px", height: "auto", borderRadius: "8px" }}
          />
        ) : (
          <span>Product files</span>
        )}
       </div>
    <div   className="input-wraper-top" >
          <Form.Group controlId="firstName">
              <Form.Label>Produt Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Product Name"
                value={formData.name}
                onChange={handleChange}
                 className="main-input"
              />
            </Form.Group>

            <Form.Group controlId="store" className="mt-2 ">
              <Form.Label>Store</Form.Label>
              <Select
              className="select-input"
                name="store"
                options={stores.map((item) => ({ label: item.store, value: item._id }))}
                defaultValue={stores.find((item) => item._id === formData.store)}
                onChange={handleSelectChange}
                placeholder="Choose Store"
              />
            </Form.Group>

            <Form.Group controlId="files" className="main-input">
        <Form.Label>Product Images</Form.Label>
        <Form.Control
          type="file"
          name="files"
          accept="image/*" // Only allows image files
          multiple // Allow multiple file selection
          onChange={handleImageChange}
        />
      </Form.Group>
          </div>

       </div>

      


          <div  className="input-wraper" >
          <Form.Group controlId="email" className="mt-2 main-input">
              <Form.Label>Category</Form.Label>

              <Select 
              name="subCategory"
              options={subcategories.map((item)=>({label:item.subCategory,value:item._id}))}    
               defaultValue={formData.subCategory}    
               onChange={handleSelectChange}  
               placeholder="Choose" />
    
            </Form.Group>

    

            <Form.Group controlId="brand" className="mt-2 main-input">
              <Form.Label>Brand</Form.Label>
              <Select
                name="brand"
                options={brands.map((item) => ({ label: item.brand, value: item._id }))}
                defaultValue={brands.find((item) => item._id === formData.brand)}
                onChange={handleSelectChange}
                placeholder="Choose Brand"
              />
            </Form.Group>

            <Form.Group controlId="website" className="mt-2 main-input">
              <Form.Label>Quantity(stock)</Form.Label>
              <Form.Control
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </Form.Group>


          </div>

      

        <div className="input-wraper" >
        <Form.Group controlId="website" className="mt-2 main-input">
              <Form.Label>Whole Sale Price</Form.Label>
              <Form.Control
                type="text"
                name="wholesalePrice"
                value={formData.wholesalePrice}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="website" className="mt-2 main-input">
              <Form.Label>Retail Price</Form.Label>
              <Form.Control
                type="text"
                name="retailPrice"
                
                value={formData.retailPrice}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="website" className="mt-2 main-input">
              <Form.Label>Discounted Price</Form.Label>
              <Form.Control
                type="text"
                name="discountedPrice"
                
                value={formData.discountedPrice}
                onChange={handleChange}
              />
            </Form.Group>

   

        </div>

    

        <div className="input-wraper" >
 

            <Form.Group controlId="website" className="mt-2 main-input">
              <Form.Label>Discription</Form.Label>
              <Form.Control
               as="textarea"
                name="description"
                placeholder="Type something..."
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

        </div>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submit}>
            {isEditing ? "Update Product" : "Add Product"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Products;
