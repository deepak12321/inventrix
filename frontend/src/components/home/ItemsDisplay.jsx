import React from "react";

const ItemsDisplay = ({ data }) => {
  //   console.log("props:-", props);
  return (
    <>
      <section className="main-items-display-section">
        <div className="sumb-items-display-section">
          <img
            src={data.product_image}
            alt="Prouct Imgae"
            className="h-60 m-auto"
          />
          <h1 className="text-center">{data.product_name}</h1>
          <div className="">
            <div className="flex">
              <p className="text-amber-950">Cost Price : &nbsp;</p>
              <span>{data.product_cost_price}</span>
            </div>
            <div className="flex">
              <p className="text-amber-950">Selling Price : &nbsp;</p>
              <span>{data.product_selling_price}</span>
            </div>
            <div className="flex">
              <p className="text-amber-950">Stock Quantity : &nbsp;</p>
              <span
                className={`${
                  data.product_quantity > 5 ? "text-black" : "text-red-500"
                }`}
              >
                {data.product_quantity}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ItemsDisplay;
