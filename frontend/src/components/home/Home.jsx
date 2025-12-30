import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ItemsDisplay from "./ItemsDisplay";

const Home = () => {
  const [categoryName, setCategoryName] = useState([]);
  const [productData, setProductData] = useState([]);
  const [items, setItems] = useState([]);
  const [active, setActive] = useState({
    category: null,
    brand: null,
    item: null,
  });

  const fetchIntitalProductData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/products/category-all"
      );
      console.log(response.data.data);
      const data = response.data.data.sort();
      setCategoryName(data);
    } catch (error) {
      console.log("error occurred while fetching data:");
    }
  };

  const handleCategoryClick = async (event, index) => {
    console.log(categoryName[index]);
    setActive((prev) => ({
      ...prev,
      category: categoryName[index],
      brand: null,
      item: null,
    }));
    // const
    const fetchData = await axios.get(
      `http://localhost:8000/api/v1/products/find-product/category/${categoryName[index]}`
    );

    console.log(fetchData.data.data);
    setProductData(fetchData.data.data);
  };

  const handleBrandClick = async (event, brand_name) => {
    console.log("the brand name is ,", brand_name);
    setActive((prev) => ({
      ...prev,
      brand: brand_name,
      item: null,
    }));

    const items = productData.filter((data) => {
      console.log(data.product_brand);
      return data.product_brand === brand_name;
    });
    console.log(items);
    setItems(items);
  };

  const handleItemsClick = (event, index) => {
    console.log(items[index].product_name);
    setActive((prev) => ({
      ...prev,
      item: index,
    }));
  };

  useEffect(() => {
    fetchIntitalProductData();
  }, []);
  return (
    <>
      <div className="main-home-container flex border-2 border-amber-500 h-screen w-screen overflow-hidden">
        <div className="left-section w-60 h-screen border-2 border-amber-500">
          <h1 className="text-center uppercase text-3xl bg-amber-400">
            Category
          </h1>
          {categoryName.map((data, index) => {
            return (
              <p
                key={index}
                className={`uppercase w-full h-10 border-y-2  border-amber-500 flex items-center justify-center text-xl cursor-pointer transition-all
                            ${
                              active.category === data
                                ? " bg-amber-100"
                                : "bg-none"
                            }`}
                onClick={(event) => {
                  handleCategoryClick(event, index);
                }}
              >
                {data}
              </p>
            );
          })}
        </div>

        <div
          className={`middle-section-brand w-40 border-2 border-amber-500 ${
            active.category === null ? "hidden" : "visible"
          }`}
        >
          <h1 className="text-center uppercase text-3xl bg-amber-400">Brand</h1>
          {productData.map((data, index) => {
            return (
              <p
                key={index}
                className={`uppercase w-full h-10 border-y-2  border-amber-500 flex items-center justify-center text-xl cursor-pointer 
                  ${
                    active.brand === data.product_brand
                      ? "border-r-0 bg-amber-100"
                      : "border-2"
                  } 
                  `}
                onClick={(event) => handleBrandClick(event, data.product_brand)}
              >
                {data.product_brand}
              </p>
            );
          })}
        </div>

        <div
          className={`middle-section-items w-80 border-2 text-xl border-amber-500 ${
            active.brand === null ? "hidden" : "visible"
          }`}
        >
          <h1 className="text-center uppercase text-3xl bg-amber-400">Items</h1>
          {items.map((data, index) => {
            return (
              <p
                key={index}
                className={`uppercase w-full h-10 border-y-2  border-amber-500 flex items-center justify-center text-xl cursor-pointer 
                  ${
                    active.item === index
                      ? "border-r-0 bg-amber-100"
                      : "border-2"
                  } 
                  `}
                // onClick={console.log(data.product_brand)}
                onClick={(event) => handleItemsClick(event, index)}
              >
                {data.product_name}
              </p>
            );
          })}
        </div>

        <div className="right-section w-3/6 h-screen m-auto ">
          {active.category != null &&
          active.brand != null &&
          active.item != null ? (
            <div className=" text-2xl px-3">
              <p>{`${active.category} > ${active.brand} > ${
                items[active.item].product_name
              }`}</p>
              <ItemsDisplay data={items[active.item]} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full w-full">
              <img
                src="./assets/inventoryHome.png"
                alt=""
                className="h-100 object-cover opacity-40"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
