import React,{useState,useEffect} from "react";
import Header from "components/Headers/Header";
import AddBrandModal from "views/popups/brand-add/BrandAddModal";
import Axioscall from "../../../services/axios";
import "./Brand.css"

const BrandList = ()=>{

    const [brands, setBrands] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState({});


    useEffect(()=>{
      GetAllBrands()
    },[])

    const toggleModal = () => {
      setShowModal(!showModal);
        GetAllBrands()
    }

  const  GetAllBrands = async()=>{
        await Axioscall("get", "/seller/brand", null, true).then((res) => {
          setBrands(res.data.data);
        });
    }

    

return(

<>
<Header/>
<div className="card">
<div className="main-header" >
   <span>  <i className="ni ni-settings-gear-65 text-blue" /> <span> Brand List</span></span>
   <AddBrandModal  onClose={toggleModal} data={selectedBrand} />
      </div>
      <div className="table-responsive">
      
        <table className="table table-striped">
          <thead className="">
            <tr>
              <th>#</th>
              <th>Brand Name</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand, index) => (
              <tr key={brand.id}>
                <td>{index + 1}</td>
                <td>{brand.brand}</td>
                <td>{brand.category.subCategory}</td>
                <td>
                
                </td>
              </tr>
            ))}
          </tbody>
      
        </table>
      </div>
    </div>


</>





)

}

export default BrandList;