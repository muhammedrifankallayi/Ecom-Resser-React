import React, { useState } from "react";
import Header from "components/Headers/Header";
import './Configuration.css'
import Select from "react-select";
import CompanyLogoAddModal from "views/popups/company-logo-add/Company-logo-add";
import AddBannerModal from "views/popups/banner-add/AddBannerModal";

const Configuration = () => {
  const [formData, setFormData] = useState({
    company_name: "",
    company_email: "",
    comapny_web: "",
    business_type: "",
    company_adress: "",
    company_policy: "",
    company_logo: null,
    company_banners:[]
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, business_type: selectedOption });
  };

  const handleLogoSave = (logo) => {
    setFormData({ ...formData, company_logo: logo });
  };
  const handelOnBannersSave = (banners) =>{
    setFormData({...formData,company_banners:banners})
  }

  // Logo Modal Manage
  const [isLogoAddModalOpen, setIsLogoAddModalOpen] = useState(false);
  const handelOpenLogoAddModal = () => setIsLogoAddModalOpen(true);
  const handleCloseLogoAddModal = () => setIsLogoAddModalOpen(false);

  // BannerModal Manage
  const [isOpenBannerAdd, setIsOpenBannerAdd] = useState(false);
  const handleOpenBannerAdd = () => setIsOpenBannerAdd(true);
  const handleCloseBannerAdd = () => setIsOpenBannerAdd(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
    alert("Company configuration saved!");
  };

  return (
    <>
      <Header />
      <div className="card">
        <div className="main-header">
          <div>
            <i className="ni ni-settings-gear-65 text-blue" /> <span> Company Configuration</span>
          </div>
        </div>
        <div className="inner-card">
          <form onSubmit={handleSubmit} className="p-4 border rounded">
            <div className="input-wraper-input">
              <div className="mb-3">
                <label htmlFor="companyName" className="form-label">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="company_name"
                  className="form-control"
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="companyEmail" className="form-label">
                  Company Email
                </label>
                <input
                  type="text"
                  id="companyEmail"
                  name="company_email"
                  className="form-control"
                  value={formData.company_email}
                  onChange={handleChange}
                  placeholder="Enter company email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="companyWeb" className="form-label">
                  Company Web
                </label>
                <input
                  type="text"
                  id="companyWeb"
                  name="comapny_web"
                  className="form-control"
                  value={formData.comapny_web}
                  onChange={handleChange}
                  placeholder="Enter company web"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="businessType" className="form-label">
                  Company Business Type
                </label>
                <Select
                  id="businessType"
                  name="business_type"
                  options={company_business_types}
                  value={formData.business_type}
                  onChange={handleSelectChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="companyAddress" className="form-label">
                  Company Address
                </label>
                <textarea
                  id="companyAddress"
                  name="company_adress"
                  className="form-control"
                  rows="2"
                  value={formData.company_adress}
                  onChange={handleChange}
                  placeholder="Enter company address"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="companyPolicy" className="form-label">
                  Company Policy
                </label>
                <textarea
                  id="companyPolicy"
                  name="company_policy"
                  className="form-control"
                  rows="2"
                  value={formData.company_policy}
                  onChange={handleChange}
                  placeholder="Enter company policy"
                />
              </div>
            </div>
            <div className="bottom-footer">
              <button onClick={handleSubmit} className="btn btn-primary">
                Save Configuration
              </button>
              <CompanyLogoAddModal
                isOpen={isLogoAddModalOpen}
                onClose={handleCloseLogoAddModal}
                onSave={handleLogoSave}
              />
              <AddBannerModal 
              isOpen={isOpenBannerAdd} 
              onClose={handleCloseBannerAdd} 
              onSave={handelOnBannersSave} 
              />
              <button className="bt btn-success" onClick={handelOpenLogoAddModal}>
                Add Company Logo
              </button>
              <button className="bt btn-info" onClick={handleOpenBannerAdd}>
                Add Company Banners
              </button>
              <button className="bt btn-danger">Subscription Info</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Configuration;

const company_business_types = [
  { label: "All", value: 0 },
  { label: "Fashion", value: 1 },
  { label: "Electronics", value: 2 },
  { label: "Healthcare", value: 3 },
  { label: "Food & Beverage", value: 4 },
  { label: "Automotive", value: 5 },
  { label: "Real Estate", value: 6 },
  { label: "Education", value: 7 },
  { label: "Technology", value: 8 },
  { label: "Entertainment", value: 9 },
  { label: "Finance", value: 10 },
  { label: "Retail", value: 11 },
  { label: "Travel & Tourism", value: 12 },
  { label: "Telecommunications", value: 13 },
  { label: "Construction", value: 14 },
  { label: "Energy & Utilities", value: 15 },
  { label: "Logistics & Transportation", value: 16 },
  { label: "Agriculture", value: 17 },
  { label: "Legal Services", value: 18 },
  { label: "Consulting", value: 19 },
  { label: "Hospitality", value: 20 },
  { label: "Media", value: 21 },
  { label: "Non-Profit", value: 22 },
  { label: "Insurance", value: 23 },
  { label: "Manufacturing", value: 24 }
];

