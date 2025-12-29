import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [categoryName, setCategoryName] = useState([]);
  const [productData, setProductData] = useState([]);
  const [active, setActive] = useState({
    category: false,
    brand: "hidden",
  });

  const fetchIntitalProductData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/products/category-all"
      );
      console.log(response.data.data);
      const data = response.data.data.sort();
      setCategoryName(response.data.data);
    } catch (error) {
      console.log("error occurred while fetching data:");
    }
  };

  const handleCategoryClick = async (event, index) => {
    console.log(categoryName[index]);
    setActive((prev) => ({
      ...prev,
      category: prev.category === index ? null : index,
    }));
    // const
    const fetchData = await axios.get(
      `http://localhost:8000/api/v1/products/find-product/category/${categoryName[index]}`
    );

    if (fetchData) {
      setActive((prev) => {
        return { ...prev, brand: "block" };
      });
    }
    console.log(fetchData.data.data);
    setProductData(fetchData.data.data);
  };
  useEffect(() => {
    fetchIntitalProductData();
  }, []);
  return (
    <>
      <div className="main-home-container flex">
        <div className="left-section w-1/6 h-screen ">
          <h1 className="text-center uppercase text-3xl bg-amber-500">
            Category
          </h1>
          {categoryName.map((data, index) => {
            return (
              <p
                key={index}
                className={`uppercase w-full h-10 border-2 flex items-center justify-center text-xl border-amber-500 cursor-pointer transition-all
    ${active.category === index ? "border-r-0 bg-amber-100" : "border-2"}
  `}
                onClick={(event) => {
                  handleCategoryClick(event, index);
                }}
              >
                {data}
              </p>
            );
          })}
        </div>
        <div className={`middle-section w-1/6 bg-amber-100 ${active.brand}`}>
          <h1 className="text-center uppercase text-3xl bg-amber-500">Brand</h1>
          {productData.map((data, index) => {
            return (
              <p
                key={index}
                className={`uppercase w-full h-10 border-y-2 flex items-center justify-center text-xl border-amber-500 cursor-pointer `}
                // onClick={(event) => {
                //   handleCategoryClick(event, index);
                // }}
              >
                {data.product_brand}
              </p>
            );
          })}
        </div>
        <div className="right-section w-3/6 h-screen border-2 border-amber-200"></div>
      </div>
    </>
  );
};

export default Home;
