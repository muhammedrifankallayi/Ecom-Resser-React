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
    <div> <i className="ni ni-settings-gear-65 text-blue" /> <span> Company Configuration</span></div>
      </div>
    <div className="inner-card">
      {/* <h2 className="text-first mb-4">Company Configuration</h2> */}
     
      <form onSubmit={handleSubmit} className="p-4 border rounded ">
  <div  className="input-wraper" >


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
          <label htmlFor="companyName" className="form-label">
        Contact Number
          </label>
          <input
            type="tel"      
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
            Company Address
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
          <label htmlFor="refundPolicy" className="form-label">
            Company Policy
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

  </div>

<div  className="bottom-footer" >
<button  className="btn btn-success w-100" >Add Company Logo</button>
<button  className="btn btn-info w-100" >Add Company Banners</button>
<button  className="btn btn-danger w-100" >Add Sub User</button>
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
