import React,{useState} from "react";
import Select from "react-select";
import Header from "components/Headers/Header";
import "./CreateProduct.css"
const ProductInformationForm = () => {
  // Sample options for dropdowns
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ];

  const [imageSrc, setImageSrc] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result); 
      };
      reader.readAsDataURL(file);
    } else {
      setImageSrc(null); 
    }
  };

  return (
 <>
 <Header/>
    <div style={{ padding: "10px 20px", fontFamily: "Arial, sans-serif" }}>
      <h3 style={{ marginBottom: "20px" }}>Product Information</h3>
     

<div  className="top-wrapper" >
<div  className="top-group" >
    
    <input type="text" placeholder="Product Id" style={{ flex: 1, padding: "8px" }} />
    <input type="file" onChange={handleImageChange}  style={{ flex: 1, padding: "8px" }} />
  </div>

<div className="img-preview" >
{imageSrc && (
              <div className="image-preview">
                <img src={imageSrc} alt="Preview" />
              </div>
            )}
</div>


</div>

    
        
          
       



      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>


      {/* Row 2 */}
      <div style={{ flex: "1 1 calc(50% - 20px)" }}>
          <label>Product Name</label>
          <input type="text" placeholder="Enter Product Name" style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ flex: "1 1 calc(25% - 20px)" }}>
          <label>Slug</label>
          <input type="text" placeholder="Slug" style={{ width: "100%", padding: "8px" }} />
        </div>
        <div style={{ flex: "1 1 calc(25% - 20px)" }}>
          <label>SKU</label>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input type="text" placeholder="Enter SKU" style={{ flex: 1, padding: "8px" }} />
            <button style={{ padding: "8px 16px", backgroundColor: "#ff9900", color: "white", border: "none", borderRadius: "5px" }}>
              Generate Code
            </button>
          </div>
        </div>


        {/* Row 1 */}
        <div style={{ flex: "1 1 calc(50% - 20px)" }}>
          <label>Store</label>
          <Select options={options} placeholder="Choose" />
        </div>


  

        {/* Row 3 */}
        <div style={{ flex: "1 1 calc(50% - 20px)" }}>
          <label>Category</label>
          <Select options={options} placeholder="Choose" />
        </div>
        <div style={{ flex: "1 1 calc(50% - 20px)" }}>
          <label>Sub Category</label>
          <Select options={options} placeholder="Choose" />
        </div>

        {/* Additional Rows */}
        <div style={{ flex: "1 1 calc(50% - 20px)" }}>
          <label>Brand</label>
          <Select options={options} placeholder="Choose" />
        </div>
        <div style={{ flex: "1 1 calc(50% - 20px)" }}>
          <label>Unit</label>
          <Select options={options} placeholder="Choose" />
        </div>
        <div style={{ flex: "1 1 calc(30% - 20px)" }}>
          <label>Color</label>
          <Select options={options} placeholder="Choose" />
        </div>
        <div style={{ flex: "1 1 calc(15% - 20px)" }}>
          <label>Qty</label>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input type="text" placeholder="0" style={{ flex: 1, padding: "8px" }} />
          </div>
        </div>
        <div style={{ flex: "1 1 calc(20% - 20px)" }}>
          <label>Buying Price</label>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input type="text" placeholder="$" style={{ flex: 1, padding: "8px" }} />
          </div>
        </div>
        <div style={{ flex: "1 1 calc(20% - 20px)" }}>
          <label>Sale Price</label>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input type="text" placeholder="$" style={{ flex: 1, padding: "8px" }} />
          </div>
        </div>
       
      </div>
      <div style={{ width:"100%",padding:"10px" }} >
        <button style={{ padding: "8px 16px", backgroundColor: "#ff9900", color: "white", border: "none", borderRadius: "5px",width:"100px" }}>
             Save
            </button>
        </div>

    </div>
 </>
  );
};

export default ProductInformationForm;
