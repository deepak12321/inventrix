import React, { useState } from "react";
import { productCategories } from "../../../data/Categories";
import axios from "axios";

const AddProduct = () => {
  const [category, setCategory] = useState(0);
  const [formData, setFormData] = useState({
    product_category: "Electronics",
    product_sub_category: "",
    product_brand: "",
    product_name: "",
    product_cost_price: "",
    product_selling_price: "",
    product_sku: "",
    product_tax: "",
    product_image: "",
  });

  const handleCategoryChange = (event) => {
    console.log(event.target.selectedIndex);
    setCategory(event.target.selectedIndex);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Create FormData object for multipart upload
      const formDataToSend = new FormData();

      // Append all form fields to FormData
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await axios.post(
        "http://localhost:8000/api/v1/products/add-product",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(response);
    } catch (error) {
      console.log("Error Adding Data", error);
    }
  };

  const handleFormChange = async (event) => {
    const name = event.target.name;

    // Handle file input differently
    if (event.target.type === "file") {
      const file = event.target.files[0];
      setFormData((prev) => {
        return {
          ...prev,
          [name]: file, // Store the actual file object
        };
      });
      console.log("File selected:", file);
    } else {
      const value = event.target.value;
      setFormData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }

    console.log(formData);
  };

  return (
    <>
      <div className="main-add-product-container ">
        <div className="sub-add-container-container w-[95%] m-auto">
          <div className="h-30 border-b-2 border-amber-400">
            <h1 className="text-5xl text-center pt-5">Add New Product</h1>
          </div>

          <form
            // action="http://localhost:8000/api/v1/products/upload"
            onSubmit={handleFormSubmit}
            // method="post"
            className="pt-10  w-300 m-auto px-15 rounded-2xl shadow-2xl mt-3  "
          >
            <div className="flex gap-5 flex-wrap justify-between w-full py-5">
              <div className="">
                <p className="pl-2 text-md font-semibold">
                  Product Category<span className="text-red-600"> *</span>
                </p>
                <select
                  name="product_category"
                  id="product-category"
                  className="border-2 bg-gray-100 focus:bg-white border-gray-400 outline-0 p-2 px-4 w-120 rounded-xl text-xl"
                  onChange={(event) => {
                    handleCategoryChange(event);
                    handleFormChange(event);
                  }}
                >
                  {/* <option value="">Select Category</option> */}
                  {category >= 0
                    ? productCategories.map((data, index) => {
                        return (
                          <option key={index} value={data.category.toLowerCase}>
                            {data.category}
                          </option>
                        );
                      })
                    : ""}
                </select>
              </div>
              <div className={`${category === -1 ? "hidden" : "visible"}`}>
                <p className="pl-2 text-md font-semibold">
                  Product Sub-Category <span className="text-red-600"> *</span>
                </p>
                <select
                  name="product_sub_category"
                  id="product-sub-category"
                  className="border-2 bg-gray-100 focus:bg-white border-gray-400 outline-0 p-2 px-4 w-120 rounded-xl text-xl"
                  onChange={(event) => {
                    handleCategoryChange(event);
                    handleFormChange(event);
                  }}
                >
                  <option value="">Select Sub Category</option>

                  {productCategories[category].subCategories.map(
                    (data, index) => {
                      return (
                        <option key={index} value={data.toLowerCase}>
                          {data}
                        </option>
                      );
                    },
                  )}
                </select>
              </div>
            </div>
            <div className="flex gap-5 flex-wrap justify-between w-full py-5">
              <div className="">
                <p className="pl-2 text-md font-semibold">
                  Product Brand <span className="text-red-600"> *</span>
                </p>
                <input
                  type="text"
                  name="product_brand"
                  id="product-brand"
                  className="border-2 bg-gray-100 focus:bg-white border-gray-400 outline-0 p-2 px-4 w-120 rounded-xl text-xl"
                  onChange={handleFormChange}
                />
              </div>
              <div className="">
                <p className="pl-2 text-md font-semibold">
                  Product Name <span className="text-red-600"> *</span>
                </p>
                <input
                  type="text"
                  name="product_name"
                  id="product-name"
                  className="border-2 bg-gray-100 focus:bg-white border-gray-400 outline-0 p-2 px-4 w-120 rounded-xl text-xl"
                  onChange={handleFormChange}
                />
              </div>
            </div>

            <div className="flex gap-5 flex-wrap justify-between w-full py-5">
              <div className="">
                <p className="pl-2 text-md font-semibold">
                  Cost Price <span className="text-red-600"> *</span>
                </p>
                <input
                  type="number"
                  name="product_cost_price"
                  id="cost-price"
                  className="border-2 bg-gray-100 focus:bg-white border-gray-400 outline-0 p-2 px-4 w-120 rounded-xl text-xl"
                  onChange={handleFormChange}
                />
              </div>
              <div className="">
                <p className="pl-2 text-md font-semibold">
                  Selling Price <span className="text-red-600"> *</span>
                </p>
                <input
                  type="number"
                  name="product_selling_price"
                  id="selling-price"
                  className="border-2 bg-gray-100 focus:bg-white border-gray-400 outline-0 p-2 px-4 w-120 rounded-xl text-xl"
                  onChange={handleFormChange}
                  placeholder=""
                />
              </div>

              <div className="flex gap-5 flex-wrap justify-between w-full py-5">
                <div className="">
                  <p className="pl-2 text-md font-semibold">
                    Tax Percentage <span className="text-red-600"> *</span>
                  </p>
                  <input
                    type="number"
                    name="product_tax"
                    id="tax-percentage"
                    className="border-2 bg-gray-100 focus:bg-white border-gray-400 outline-0 p-2 px-4 w-120 rounded-xl text-xl"
                    onChange={handleFormChange}
                    placeholder=""
                  />
                </div>
                <div className="">
                  <p className="pl-2 text-md font-semibold">Product Sku</p>
                  <input
                    type="text"
                    name="product_sku"
                    id="product-sku"
                    className="border-2 bg-gray-100 focus:bg-white border-gray-400 outline-0 p-2 px-4 w-120 rounded-xl text-xl"
                    onChange={handleFormChange}
                    placeholder=""
                  />
                </div>
              </div>
              <div className="flex gap-5 flex-wrap justify-center w-full py-5">
                <div className="flex flex-col gap-2">
                  <p className="pl-2 text-md font-semibold font-medium">
                    Product Image
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    className="border-2 border-amber-200 bg-amber-50 
               p-2 px-4 rounded-xl text-lg 
               file:mr-4 file:py-2 file:px-4
               file:rounded-lg file:border-0
               file:bg-amber-200 file:text-amber-900
               hover:file:bg-amber-300"
                    id="product-image"
                    name="product_image"
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="flex gap-5 flex-wrap justify-center w-full py-5">
                <button
                  type="reset"
                  className="h-10 w-45 bg-yellow-300 cursor-pointer hover:shadow-md hover:bg-yellow-400 hover:scale-110 transition-all rounded text-white font-semibold "
                >
                  Reset
                </button>
                <button
                  type="submit"
                  className="h-10 w-45 bg-blue-400 cursor-pointer hover:shadow-md hover:bg-blue-500 hover:scale-110 transition-all rounded text-white font-semibold "
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* <input type="text" name="" id="" /> */}
      </div>
    </>
  );
};

export default AddProduct;
