import React, { useState } from "react";
import Header from "components/Headers/Header";
import './Category.css'

const CategoryList = () => {
  const [showModal, setShowModal] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [isActive, setIsActive] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSubcategory = {
      categoryName,
      parentCategory,
      isActive,
    };
    setSubcategories([...subcategories, newSubcategory]);
    setCategoryName("");
    setParentCategory("");
    setIsActive(false);
    toggleModal();
  };

  return (
  <>
  <Header/>
    <div className="card">
    <div className="main-header" >
   <span>  <i className="ni ni-settings-gear-65 text-blue" /> <span> Category List</span></span>
   <button className="btn btn-primary " onClick={toggleModal}>
        Add Subcategory
      </button>
      </div>
     
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Parent Category</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map((subcategory, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{subcategory.categoryName}</td>
              <td>{subcategory.parentCategory}</td>
              <td>{subcategory.isActive ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">  <i  className="ni ni-fat-add" /> Create Subcategory</h5>
                {/* <button
                  type="button"
                  className="btn-close"
                  onClick={toggleModal}
                >X</button> */}
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Category Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                      placeholder="Enter category name"
                      required
                    />
                  </div>
                  <div className="mb-3">
  <label className="form-label">Parent Category</label>
  <select
    className="form-control"
    value={parentCategory}
    onChange={(e) => setParentCategory(e.target.value)}
    required
  >
    <option value="" disabled>
      Select parent category
    </option>
    <option value="Category 1">Category 1</option>
    <option value="Category 2">Category 2</option>
    <option value="Category 3">Category 3</option>
  </select>
</div>

                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="activeCheck"
                      checked={isActive}
                      onChange={(e) => setIsActive(e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="activeCheck">
                      Active
                    </label>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={toggleModal}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  
  </>
  );
};

export default CategoryList;
