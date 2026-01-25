import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/global/Navbar";
import Product from "./components/product/Product";
import UpdateProduct from "./components/product/UpdateProduct";
import Stock from "./components/stocks/Stock";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="main-container ">
        <div className="sub-continer w-screen pt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Product />} />
            <Route
              path="/product/update/:productId"
              element={<UpdateProduct />}
            />
            <Route path="/stocks" element={<Stock />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
