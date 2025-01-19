import React, { useState,useEffect } from "react";
import Header from "components/Headers/Header";
import './Category.css'
import AddSubCategoryModal from "views/popups/category-add/CategoryAdd";
import Axioscall from "../../../services/axios";

const CategoryList = () => {
  const [showModal, setShowModal] = useState(false);
  const [subcategories, setSubcategories] = useState([]);


 useEffect(()=>{
  getAllSubCategory()
 },[])


  const toggleModal = () => {
    setShowModal(!showModal);
    getAllSubCategory()
  };



 const getAllSubCategory = async() => {
   await Axioscall("get", "/seller/subCategory", null, true).then((res) => {
     setSubcategories(res.data.data);
   });
  }

  return (
  <>
  <Header/>
    <div className="card">
    <div className="main-header" >
   <span>  <i className="ni ni-settings-gear-65 text-blue" /> <span> Category List</span></span>
   {/* <button className="btn btn-primary " onClick={toggleModal}>
        Add Subcategory
      </button> */}
      <AddSubCategoryModal   isOpen={showModal} onClose={toggleModal} />
      </div>
     
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Main Category</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map((subcategory, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{subcategory.subCategory}</td>
              <td>{subcategory.category.category}</td>
              <td>{subcategory.isActive ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  
  </>
  );
};

export default CategoryList;
