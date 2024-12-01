import React, { useState } from "react";
import "./AddBannerModal.css";

const AddBannerModal = ({ isOpen, onClose, onAddBanners }) => {
  const [banners, setBanners] = useState([]);

  const handleBannerChange = (e) => {
    const files = Array.from(e.target.files);
    const newBanners = files.map((file) => {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = (event) => resolve(event.target.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newBanners).then((uploadedBanners) =>
      setBanners([...banners, ...uploadedBanners])
    );
  };

  const handleSave = () => {
    if (banners.length > 0) {
      onAddBanners(banners);
      setBanners([]);
      onClose();
    } else {
      alert("Please upload at least one banner!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Banners</h2>
        <div className="banners-preview">
          {banners.length > 0 ? (
            banners.map((banner, index) => (
              <div className="banner-item" key={index}>
                <img src={banner} alt={`Banner Preview ${index + 1}`} />
              </div>
            ))
          ) : (
            <span>No Banners Uploaded</span>
          )}
        </div>
        <div className="form-group">
          <label>Upload Banners:</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleBannerChange}
          />
        </div>
        <div className="form-actions">
          <button className="btn-save" onClick={handleSave}>
            Save
          </button>
          <button className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBannerModal;
