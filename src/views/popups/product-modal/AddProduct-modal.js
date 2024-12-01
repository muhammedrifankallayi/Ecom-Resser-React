import React, { useState } from "react";
import "./AddProduct-modal.css";

const AddProductModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
    date: "",
    image: null,
    active: false,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
        setFormData({ ...formData, image: file });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    setFormData({
      name: "",
      price: "",
      category: "",
      quantity: "",
      date: "",
      image: null,
      active: false,
    });
    setImagePreview(null);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit} className="grid-content" >
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              required
            />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              required
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="grocery">Grocery</option>
            </select>
          </div>
          <div className="form-group">
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              required
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Image:</label>
            <input type="file" name="image" onChange={handleChange} />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
              />{" "}
              Active
            </label>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-save">
              Save
            </button>
            <button
              type="button"
              className="btn-cancel"
              onClick={() => {
                onClose();
                setImagePreview(null);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
