import React from "react";

const ItemsDisplay = ({ data }) => {
  return (
    <div className="space-y-6">
      {/* Product Image */}
      <div className="flex justify-center mb-6">
        <div className="relative group">
          <img
            src={data.product_image}
            alt={data.product_name}
            className="h-72 w-auto object-contain rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Product Name */}
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
        {data.product_name}
      </h1>

      {/* Product Details Grid */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {/* Category */}
        <div className="bg-linear-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl border border-indigo-200">
          <p className="text-sm text-indigo-600 font-semibold mb-1">Category</p>
          <p className="text-lg text-gray-800 font-medium capitalize">
            {data.product_category}
          </p>
        </div>

        {/* Subcategory */}
        <div className="bg-linear-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-600 font-semibold mb-1">
            Subcategory
          </p>
          <p className="text-lg text-gray-800 font-medium capitalize">
            {data.product_sub_category}
          </p>
        </div>

        {/* Brand */}
        <div className="bg-linear-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <p className="text-sm text-purple-600 font-semibold mb-1">Brand</p>
          <p className="text-lg text-gray-800 font-medium capitalize">
            {data.product_brand}
          </p>
        </div>

        {/* SKU */}
        <div className="bg-linear-to-br from-pink-50 to-pink-100 p-4 rounded-xl border border-pink-200">
          <p className="text-sm text-pink-600 font-semibold mb-1">SKU</p>
          <p className="text-lg text-gray-800 font-medium">
            {data.product_sku || "N/A"}
          </p>
        </div>

        {/* Cost Price */}
        <div className="bg-linear-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
          <p className="text-sm text-orange-600 font-semibold mb-1">
            Cost Price
          </p>
          <p className="text-2xl text-gray-800 font-bold">
            ₹{data.product_cost_price.toLocaleString()}
          </p>
        </div>

        {/* Selling Price */}
        <div className="bg-linear-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <p className="text-sm text-green-600 font-semibold mb-1">
            Selling Price
          </p>
          <p className="text-2xl text-gray-800 font-bold">
            ₹{data.product_selling_price.toLocaleString()}
          </p>
        </div>

        {/* Tax */}
        <div className="bg-linear-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200">
          <p className="text-sm text-yellow-700 font-semibold mb-1">Tax Rate</p>
          <p className="text-lg text-gray-800 font-medium">
            {data.product_tax}%
          </p>
        </div>

        {/* Unit */}
        <div className="bg-linear-to-br from-teal-50 to-teal-100 p-4 rounded-xl border border-teal-200">
          <p className="text-sm text-teal-600 font-semibold mb-1">Unit</p>
          <p className="text-lg text-gray-800 font-medium uppercase">
            {data.product_unit}
          </p>
        </div>

        {/* Stock Quantity - Full Width */}
        <div
          className={`col-span-2 p-6 rounded-xl border-2 ${
            data.product_quantity <= data.product_min_quantity
              ? "bg-linear-to-br from-red-50 to-red-100 border-red-300"
              : "bg-linear-to-br from-emerald-50 to-emerald-100 border-emerald-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className={`text-sm font-semibold mb-1 ${
                  data.product_quantity <= data.product_min_quantity
                    ? "text-red-600"
                    : "text-emerald-600"
                }`}
              >
                Stock Quantity
              </p>
              <p
                className={`text-4xl font-bold ${
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
              <p className="text-2xl text-gray-700 font-semibold">
                {data.product_min_quantity}
              </p>
            </div>
          </div>
          {data.product_quantity <= data.product_min_quantity && (
            <div className="mt-4 bg-red-200 border border-red-300 rounded-lg px-4 py-2">
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
                Low Stock Alert!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex justify-center mt-6">
        <span
          className={`px-6 py-2 rounded-full text-sm font-bold ${
            data.is_active
              ? "bg-green-500 text-white"
              : "bg-gray-400 text-white"
          }`}
        >
          {data.is_active ? "✓ Active" : "✗ Inactive"}
        </span>
      </div>
    </div>
  );
};

export default ItemsDisplay;
