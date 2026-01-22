import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemsDisplay from "./ItemsDisplay";

const EditProduct = () => {
  const [categoryName, setCategoryName] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [productData, setProductData] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [itemEdited, setItemEdited] = useState(false);
  const [items, setItems] = useState([]);
  const [active, setActive] = useState({
    category: null,
    subcategory: null,
    brand: null,
    item: null,
  });
  const [loading, setLoading] = useState({
    categories: false,
    subcategories: false,
    products: false,
  });

  const fetchInitialProductData = async () => {
    try {
      setLoading((prev) => ({ ...prev, categories: true }));
      const response = await axios.get(
        "http://localhost:8000/api/v1/products/category-all",
      );
      const data = response.data.data.sort();
      setCategoryName(data);
    } catch (error) {
      console.log("Error occurred while fetching categories:", error);
    } finally {
      setLoading((prev) => ({ ...prev, categories: false }));
    }
  };

  const handleCategoryClick = async (event, index) => {
    const selectedCategory = categoryName[index];
    setActive({
      category: selectedCategory,
      subcategory: null,
      brand: null,
      item: null,
    });
    setSubcategories([]);
    setFilteredBrands([]);
    setItems([]);

    try {
      setLoading((prev) => ({ ...prev, subcategories: true }));

      // Fetch subcategories for this category
      const subcatResponse = await axios.get(
        `http://localhost:8000/api/v1/products/subcategories/${selectedCategory}`,
      );
      setSubcategories(subcatResponse.data.data.sort());

      // Fetch all products for this category
      const productsResponse = await axios.get(
        `http://localhost:8000/api/v1/products/find-product/category/${selectedCategory}`,
      );
      setProductData(productsResponse.data.data);
    } catch (error) {
      console.log("Error fetching subcategories:", error);
    } finally {
      setLoading((prev) => ({ ...prev, subcategories: false }));
    }
  };

  const handleSubcategoryClick = (event, subcategory) => {
    setActive((prev) => ({
      ...prev,
      subcategory: subcategory,
      brand: null,
      item: null,
    }));
    setItems([]);

    // Filter products by subcategory and get unique brands
    const filteredProducts = productData.filter(
      (product) => product.product_sub_category === subcategory,
    );

    // Get unique brands from filtered products
    const uniqueBrands = [
      ...new Set(filteredProducts.map((product) => product.product_brand)),
    ];
    setFilteredBrands(uniqueBrands.sort());
  };

  const handleBrandClick = (event, brand_name) => {
    setActive((prev) => ({
      ...prev,
      brand: brand_name,
      item: null,
    }));

    const filteredItems = productData.filter(
      (data) =>
        data.product_brand === brand_name &&
        data.product_sub_category === active.subcategory,
    );
    setItems(filteredItems);
  };

  const handleItemsClick = (event, index) => {
    setActive((prev) => ({
      ...prev,
      item: index,
    }));
  };

  useEffect(() => {
    setItemEdited(false);
    fetchInitialProductData();
  }, [itemEdited]);

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className=" border-b-2 border-amber-400">
        <div className="px-8 py-4">
          <h1 className="text-center pt-5 text-black text-5xl font-medium tracking-wide">
            Edit Product
          </h1>
          <p className="text-center font-medium text-sm mt-1">
            Select filters to find and edit products
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="px-8 py-6">
          <div className="grid grid-cols-4 gap-4">
            {/* Category Select */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Category
              </label>
              <select
                value={active.category || ""}
                onChange={(e) => {
                  const index = categoryName.indexOf(e.target.value);
                  if (index !== -1) handleCategoryClick(e, index);
                }}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-700 font-medium capitalize transition-all"
              >
                <option value="">Select Category</option>
                {categoryName.map((category, index) => (
                  <option key={index} value={category} className="capitalize">
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Select */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Subcategory
              </label>
              <select
                value={active.subcategory || ""}
                onChange={(e) => handleSubcategoryClick(e, e.target.value)}
                disabled={!active.category}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 font-medium capitalize transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Select Subcategory</option>
                {subcategories.map((subcategory, index) => (
                  <option
                    key={index}
                    value={subcategory}
                    className="capitalize"
                  >
                    {subcategory}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand Select */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Brand
              </label>
              <select
                value={active.brand || ""}
                onChange={(e) => handleBrandClick(e, e.target.value)}
                disabled={!active.subcategory}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white text-gray-700 font-medium capitalize transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Select Brand</option>
                {filteredBrands.map((brand, index) => (
                  <option key={index} value={brand} className="capitalize">
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Select */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Product
              </label>
              <select
                value={active.item !== null ? active.item : ""}
                onChange={(e) => handleItemsClick(e, parseInt(e.target.value))}
                disabled={!active.brand}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white text-gray-700 font-medium transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">Select Product</option>
                {items.map((product, index) => (
                  <option key={index} value={index}>
                    {product.product_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className="overflow-y-auto"
        style={{ height: "calc(100vh - 220px)" }}
      >
        {active.category != null &&
        active.subcategory != null &&
        active.brand != null &&
        active.item != null ? (
          <div className="px-8 py-8">
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center flex-wrap gap-2 text-sm">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg font-semibold capitalize">
                {active.category}
              </span>
              <span className="text-gray-400">/</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg font-semibold capitalize">
                {active.subcategory}
              </span>
              <span className="text-gray-400">/</span>
              <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-lg font-semibold capitalize">
                {active.brand}
              </span>
              <span className="text-gray-400">/</span>
              <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-lg font-semibold">
                {items[active.item].product_name}
              </span>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <ItemsDisplay
                data={items[active.item]}
                setItemEdited={setItemEdited}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full p-8">
            <div className="text-center space-y-4">
              <div className="w-64 h-64 mx-auto opacity-30 relative">
                <img
                  src="./assets/inventoryHome.png"
                  alt="Inventory Management"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-gray-700">
                  Welcome to Product Management
                </h2>
                <p className="text-gray-500 text-lg">
                  Use the filters above to select a product
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProduct;
