import React, { useState } from "react";
import Header from "components/Headers/Header";
import './Configuration.css'
import CompanyLogoAddModal from "views/popups/company-logo-add/Company-logo-add";
import AddBannerModal from "views/popups/banner-add/AddBannerModal";


const Configuration = () => {
  const [companyName, setCompanyName] = useState("");
  const [refundPolicy, setRefundPolicy] = useState("");
  const [logo, setLogo] = useState(null);
  const [banners, setBanners] = useState([]);


  // Logo Modla Manage
  const [isLogoAddModalOpen,setIsLogoAddModalOpen] = useState(false);
  const handelOpenLogoAddModal = ()=> setIsLogoAddModalOpen(true);
  const handleCloseLogoAddModal = () => setIsLogoAddModalOpen(false);


  // BannerModal Manage

  const [isOpenBannerAdd,setIsOpenBannerAdd] = useState(false);
  const handleOpenBannerAdd = ()=> setIsOpenBannerAdd(true);
  const handleCloseBannerAdd = () => setIsOpenBannerAdd(false);



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
<CompanyLogoAddModal  className="jj" isOpen={isLogoAddModalOpen}  onClose={handleCloseLogoAddModal} />
<AddBannerModal  isOpen={isOpenBannerAdd} onClose={handleCloseBannerAdd}  />
<button  className="bt btn-success "   onClick={handelOpenLogoAddModal} >Add Company Logo</button>
<button  className="bt btn-info " onClick={handleOpenBannerAdd} >Add Company Banners</button>
<button  className="bt btn-danger " >Add Sub User</button>
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
