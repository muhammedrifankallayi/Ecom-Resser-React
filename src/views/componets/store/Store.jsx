import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Axioscall from "../../../services/axios";
import toast from "react-hot-toast";
import Header from "components/Headers/Header";
import './Store.css'

function StoreList() {
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track if editing
  const [editId, setEditId] = useState(null); // ID of reseller being edited
  const [Store, setStore] = useState([]);
  const [formData, setFormData] = useState({
    store: "",
    owner: "",
    email: "",
    website: "",
    phone_number: "",
    actuve: true,
  });

  // Reset modal form
  const resetForm = () => {
    setFormData({
      store: "",
      owner: "",
      email: "",
      website: "",
      phone_number: "",
      active: true,
    });
    setIsEditing(false);
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        const response = await Axioscall("put", `store/${editId}`, formData, true);
        toast.success(response.data.message)
      } else {
        // Add new reseller
        const response = await Axioscall("post", "/store", formData, true);
      
        toast.success(response.data.message)

      }
      resetForm();
      getStore();
      handleClose();
    } catch (error) {
      console.error("Error in submit:", error);
    }
  };

  const getStore = async () => {
    try {
      let data = await Axioscall("get", "/store", null, true);
      console.log(data.data.data, "Store...");
      setStore(data.data.data);
    } catch (error) {
      console.error("Error fetching Store:", error);
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
    });
    setEditId(item._id);
    setIsEditing(true);
    setShow(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await Axioscall("put", `store/${id}`, {action:"delete"}, true);
      console.log(response, "Delete Response...");
      // setStore(Store.filter((sub) => sub._id !== id));
      
      toast.success(response.data.message)

      getStore()
    } catch (error) {
      console.error("Error deleting reseller:", error);
    }
  };

  useEffect(() => {
    getStore();
  }, []);

  return (
    <div>
      <Header/>
      <div className="card mt-3">
        <div className="card-header">
          <div
            className="header-title"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>Store</span>
            <button onClick={handleShow} className="btn btn-outline-success">
              <i className="file-plus"></i> Add Store
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
                    <th>Store</th>
                    <th>Store Person</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Active</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Store && Store.length > 0 ? (
                    Store.map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item.store }</td>
                        <td>{ item.owner}</td>
                        <td>{item.email}</td>
                        <td>{item.phone_number}</td>
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
                          <i
                            className="ri-pencil-line"
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={() => handleEdit(item)}
                          ></i>
                          <i
                            className="ri-delete-bin-line"
                            style={{
                              color: "red",
                              cursor: "pointer",
                              marginLeft: "10px",
                            }}
                            onClick={() => handleDelete(item._id)}
                          ></i>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No Stores found.</td>
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
          <Modal.Title>{isEditing ? "Edit Store" : "Add Store"}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Form>
            <Form.Group controlId="firstName">
              <Form.Label>Store Name</Form.Label>
              <Form.Control
                type="text"
                name="store"
                placeholder="Enter first name"
                value={formData.store}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="lastName" className="mt-3">
              <Form.Label>Owner Name</Form.Label>
              <Form.Control
                type="text"
                name="owner"
                placeholder="Enter last name"
                value={formData.owner}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="email" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

    

            <Form.Group controlId="phoneNumber" className="mt-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone_number"
                placeholder="Enter phone number"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </Form.Group>


            <Form.Group controlId="website" className="mt-3">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                name="website"
                placeholder=" website  Url"
                value={formData.website}
                onChange={handleChange}
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isEditing ? "Update Store" : "Add Store"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StoreList;
