import React, { useEffect, useState } from "react";
import axios from "axios";
import ItemsDisplay from "../product/ItemsDisplay";

const Home = () => {
  const [categoryName, setCategoryName] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [productData, setProductData] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
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
        "http://localhost:8000/api/v1/products/category-all"
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
        `http://localhost:8000/api/v1/products/subcategories/${selectedCategory}`
      );
      setSubcategories(subcatResponse.data.data.sort());

      // Fetch all products for this category
      const productsResponse = await axios.get(
        `http://localhost:8000/api/v1/products/find-product/category/${selectedCategory}`
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
      (product) => product.product_sub_category === subcategory
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
        data.product_sub_category === active.subcategory
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
    fetchInitialProductData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="flex h-screen w-screen overflow-hidden">
        {/* Category Section */}
        <div className="w-64 bg-white shadow-xl border-r border-gray-200 flex flex-col">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 shadow-md">
            <h1 className="text-white text-2xl font-bold tracking-wide">
              Categories
            </h1>
          </div>
          <div className="overflow-y-auto flex-1">
            {loading.categories ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : (
              categoryName.map((data, index) => (
                <div
                  key={index}
                  className={`
                    px-6 py-4 cursor-pointer transition-all duration-200 border-b border-gray-100
                    hover:bg-indigo-50 hover:border-l-4 hover:border-indigo-600
                    ${
                      active.category === data
                        ? "bg-indigo-100 border-l-4 border-indigo-600 font-semibold text-indigo-700"
                        : "text-gray-700"
                    }
                  `}
                  onClick={(event) => handleCategoryClick(event, index)}
                >
                  <p className="text-base capitalize">{data}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Subcategory Section */}
        {active.category && (
          <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 shadow-md">
              <h1 className="text-white text-2xl font-bold tracking-wide">
                Subcategories
              </h1>
            </div>
            <div className="overflow-y-auto flex-1">
              {loading.subcategories ? (
                <div className="p-4 text-center text-gray-500">Loading...</div>
              ) : subcategories.length > 0 ? (
                subcategories.map((subcategory, index) => (
                  <div
                    key={index}
                    className={`
                      px-6 py-4 cursor-pointer transition-all duration-200 border-b border-gray-100
                      hover:bg-blue-50 hover:border-l-4 hover:border-blue-600
                      ${
                        active.subcategory === subcategory
                          ? "bg-blue-100 border-l-4 border-blue-600 font-semibold text-blue-700"
                          : "text-gray-700"
                      }
                    `}
                    onClick={(event) =>
                      handleSubcategoryClick(event, subcategory)
                    }
                  >
                    <p className="text-base capitalize">{subcategory}</p>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-400 italic">
                  No subcategories
                </div>
              )}
            </div>
          </div>
        )}

        {/* Brand Section */}
        {active.subcategory && (
          <div className="w-56 bg-white shadow-lg border-r border-gray-200 flex flex-col">
            <div className="bg-linear-to-r from-cyan-600 to-teal-600 p-6 shadow-md">
              <h1 className="text-white text-2xl font-bold tracking-wide">
                Brands
              </h1>
            </div>
            <div className="overflow-y-auto flex-1">
              {filteredBrands.length > 0 ? (
                filteredBrands.map((brand, index) => (
                  <div
                    key={index}
                    className={`
                      px-6 py-4 cursor-pointer transition-all duration-200 border-b border-gray-100
                      hover:bg-cyan-50 hover:border-l-4 hover:border-cyan-600
                      ${
                        active.brand === brand
                          ? "bg-cyan-100 border-l-4 border-cyan-600 font-semibold text-cyan-700"
                          : "text-gray-700"
                      }
                    `}
                    onClick={(event) => handleBrandClick(event, brand)}
                  >
                    <p className="text-base capitalize">{brand}</p>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-400 italic">
                  No brands
                </div>
              )}
            </div>
          </div>
        )}

        {/* Items Section */}
        {active.brand && (
          <div className="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col">
            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-6 shadow-md">
              <h1 className="text-white text-2xl font-bold tracking-wide">
                Products
              </h1>
            </div>
            <div className="overflow-y-auto flex-1">
              {items.length > 0 ? (
                items.map((data, index) => (
                  <div
                    key={index}
                    className={`
                      px-6 py-4 cursor-pointer transition-all duration-200 border-b border-gray-100
                      hover:bg-teal-50 hover:border-l-4 hover:border-teal-600
                      ${
                        active.item === index
                          ? "bg-teal-100 border-l-4 border-teal-600 font-semibold text-teal-700"
                          : "text-gray-700"
                      }
                    `}
                    onClick={(event) => handleItemsClick(event, index)}
                  >
                    <p className="text-sm leading-relaxed">
                      {data.product_name}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-400 italic">
                  No products
                </div>
              )}
            </div>
          </div>
        )}

        {/* Details Section */}
        <div className="flex-1 bg-gradient-to-br from-gray-50 to-slate-100 overflow-y-auto">
          {active.category != null &&
          active.subcategory != null &&
          active.brand != null &&
          active.item != null ? (
            <div className="p-8">
              {/* Breadcrumb */}
              <div className="mb-6 flex items-center space-x-2 text-sm text-gray-600">
                <span className="font-medium text-indigo-600">
                  {active.category}
                </span>
                <span className="text-gray-400">/</span>
                <span className="font-medium text-blue-600">
                  {active.subcategory}
                </span>
                <span className="text-gray-400">/</span>
                <span className="font-medium text-cyan-600">
                  {active.brand}
                </span>
                <span className="text-gray-400">/</span>
                <span className="font-medium text-teal-700">
                  {items[active.item].product_name}
                </span>
              </div>

              {/* Product Details */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                <ItemsDisplay data={items[active.item]} />
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
                    Welcome to Inventory Management
                  </h2>
                  <p className="text-gray-500 text-lg">
                    Select a category to get started
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
