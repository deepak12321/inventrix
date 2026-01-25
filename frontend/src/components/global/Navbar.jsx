import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <navbar className="main-outer-container ">
        <div
          className="sub-nav-container h-15 w-screen bg-amber-300 flex items-center p-4 justify-between
        "
        >
          <div className="nav-text text-4xl">
            <p>INVENTRIX</p>
          </div>
          <div className="nav-links border-2 w-80 flex gap-4 justify-center text-2xl">
            <Link to="/">Home</Link>
            <Link to="/product">Product</Link>
            <Link to="/stocks">Stocks</Link>
          </div>
        </div>
      </navbar>
    </>
  );
};

export default Navbar;
