import React, { useState } from "react";
import "./Company-logo-add.css";

const CompanyLogoAddModal = ({ isOpen, onClose, onSave }) => {
  const [logo, setLogo] = useState(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setLogo(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(logo);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add Company Logo</h2>
        <div className="logo-preview">
          {logo ? (
            <img src={logo} alt="Logo Preview" />
          ) : (
            <span>No Logo Uploaded</span>
          )}
        </div>
        <div className="form-group">
          <label>Upload Logo:</label>
          <input type="file" accept="image/*" onChange={handleLogoChange} />
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

export default CompanyLogoAddModal;
