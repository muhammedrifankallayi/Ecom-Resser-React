import React, { useState } from "react";
import Header from "components/Headers/Header";
import './Configuration.css'

const Configuration = () => {
  const [companyName, setCompanyName] = useState("");
  const [refundPolicy, setRefundPolicy] = useState("");
  const [logo, setLogo] = useState(null);
  const [banners, setBanners] = useState([]);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file)); 
    }
  };

  const handleBannerUpload = (e) => {
    const files = Array.from(e.target.files);
    setBanners(files.map((file) => URL.createObjectURL(file))); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Company configuration saved!");
  };

  return (
   <>
   
   <Header />
    <div className="card" >
    <div className="main-header" >
     <i className="ni ni-settings-gear-65 text-blue" /> <span> Company Configuration</span>
      </div>
    <div className="inner-card">
      {/* <h2 className="text-first mb-4">Company Configuration</h2> */}
     
      <form onSubmit={handleSubmit} className="p-4 border rounded ">
        <div className="mb-3">
          <label htmlFor="companyName" className="form-label">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            className="form-control"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter company name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="refundPolicy" className="form-label">
            Refund Policy
          </label>
          <textarea
            id="refundPolicy"
            className="form-control"
            rows="4"
            value={refundPolicy}
            onChange={(e) => setRefundPolicy(e.target.value)}
            placeholder="Write refund policy here"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="logoUpload" className="form-label">
            Company Logo
          </label>
          <input
            type="file"
            id="logoUpload"
            className="form-control"
            onChange={handleLogoUpload}
          />
          {logo && (
            <div className="mt-3">
              <img src={logo} alt="Logo Preview" className="img-thumbnail" width="150" />
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="bannerUpload" className="form-label">
            Banners (Multiple)
          </label>
          <input
            type="file"
            id="bannerUpload"
            className="form-control"
            multiple
            onChange={handleBannerUpload}
          />
          <div className="mt-3 d-flex flex-wrap gap-2">
            {banners.map((banner, idx) => (
              <img
                key={idx}
                src={banner}
                alt={`Banner Preview ${idx + 1}`}
                className="img-thumbnail"
                width="150"
              />
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Save Configuration
        </button>
      </form>
    </div>
    </div>
   </>
  );
};

export default Configuration;
