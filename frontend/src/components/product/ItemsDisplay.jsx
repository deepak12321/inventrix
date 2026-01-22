import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const ItemsDisplay = ({ data, setItemEdited }) => {
  const productId = data._id;
  console.log(productId);

  const handleProductDelete = async (event, product_id) => {
    try {
      const confirm = window.confirm(
        "Confirm again to Delete this product. \nAfter Deleting you wont be able to access this Product.",
      );
      console.log(typeof product_id);
      if (confirm) {
        const deleteProduct = await axios.delete(
          `http://localhost:8000/api/v1/products/delete-product/${product_id}`,
        );
        if (deleteProduct) {
          setItemEdited(true);
          window.alert("Product deleted Sucessfully");
        }
      }
    } catch (error) {
      console.log("Something went wrong while Deleting the Product:-", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Product Name Header */}
      <div className="border-b border-gray-200 pb-4 flex justify-between">
        <div className="left">
          <h1 className="text-4xl font-bold text-gray-800">
            {data.product_name}
          </h1>
          <div className="flex items-center gap-3 mt-3">
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                data.is_active
                  ? "bg-green-500 text-white"
                  : "bg-gray-400 text-white"
              }`}
            >
              {data.is_active ? "✓ Active" : "✗ Inactive"}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600 font-medium">
              SKU: {data.product_sku || "N/A"}
            </span>
          </div>
        </div>

        <div className="right">
          <div className="flex gap-4 pt-4 w-100">
            <Link to={`/product/update/${data._id}`} className="flex-1">
              <button className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-200 transform hover:scale-105">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                  <path
                    fillRule="evenodd"
                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                    clipRule="evenodd"
                  />
                </svg>
                Edit Product
              </button>
            </Link>
            <button
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105"
              onClick={(event) => handleProductDelete(event, productId)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Delete Product
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Horizontal Layout */}
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column - Image */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 flex items-center justify-center border-2 border-gray-200">
            <img
              src={data.product_image}
              alt={data.product_name}
              className="max-h-96 w-auto object-contain rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Category Info Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl border border-indigo-200">
              <p className="text-xs text-indigo-600 font-semibold mb-1">
                Category
              </p>
              <p className="text-sm text-gray-800 font-medium capitalize">
                {data.product_category}
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
              <p className="text-xs text-blue-600 font-semibold mb-1">
                Subcategory
              </p>
              <p className="text-sm text-gray-800 font-medium capitalize">
                {data.product_sub_category}
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
              <p className="text-xs text-purple-600 font-semibold mb-1">
                Brand
              </p>
              <p className="text-sm text-gray-800 font-medium capitalize">
                {data.product_brand}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          {/* Pricing Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Pricing Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Cost Price</p>
                <p className="text-3xl text-orange-600 font-bold">
                  ₹{data.product_cost_price.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Selling Price</p>
                <p className="text-3xl text-green-600 font-bold">
                  ₹{data.product_selling_price.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tax Rate</span>
                <span className="text-xl text-yellow-700 font-bold">
                  {data.product_tax}%
                </span>
              </div>
            </div>
          </div>

          {/* Stock Section */}
          <div
            className={`rounded-2xl p-6 border-2 ${
              data.product_quantity <= data.product_min_quantity
                ? "bg-gradient-to-br from-red-50 to-red-100 border-red-300"
                : "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-300"
            }`}
          >
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Stock Information
            </h3>
            <div className="flex items-end justify-between">
              <div>
                <p
                  className={`text-sm font-semibold mb-1 ${
                    data.product_quantity <= data.product_min_quantity
                      ? "text-red-600"
                      : "text-emerald-600"
                  }`}
                >
                  Current Stock
                </p>
                <p
                  className={`text-5xl font-bold ${
                    data.product_quantity <= data.product_min_quantity
                      ? "text-red-700"
                      : "text-emerald-700"
                  }`}
                >
                  {data.product_quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Minimum Required</p>
                <p className="text-3xl text-gray-700 font-semibold">
                  {data.product_min_quantity}
                </p>
              </div>
            </div>
            {data.product_quantity <= data.product_min_quantity && (
              <div className="mt-4 bg-red-200 border border-red-300 rounded-lg px-4 py-3">
                <p className="text-red-800 font-semibold text-sm flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Low Stock Alert! Reorder recommended.
                </p>
              </div>
            )}
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-600">Unit</span>
              <span className="text-lg text-gray-800 font-semibold uppercase">
                {data.product_unit}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
        </div>
      </div>
    </div>
  );
};

export default ItemsDisplay;
