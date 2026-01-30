import React from "react";
import { useParams } from "react-router-dom";

const UpdateProduct = ({ data }) => {
  const { productId } = useParams();
  console.log("params ", productId);
  return (
    <>
      {/* <div className="item_name">{data.product_name}</div */}
      Comming Soon ....
    </>
  );
};

export default UpdateProduct;
