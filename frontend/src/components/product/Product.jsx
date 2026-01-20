import { useState } from "react";
import AddProduct from "./AddProduct";
import DeleteProduct from "./DeleteProduct";
import UpdateProduct from "./UpdateProduct";

const Product = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      tabName: "Add Product",
      component: AddProduct,
    },
    {
      tabName: "Update Product",
      component: UpdateProduct,
    },
    {
      tabName: "Delete Product",
      component: DeleteProduct,
    },
  ];

  const handleTabsClick = (index) => {
    setActiveTab(index);
  };

  const TabComponent = tabs[activeTab].component;

  return (
    <>
      <div className="main-product-container">
        <div className="sub-product-container"></div>

        <div className="tabs-container flex  px-5 ">
          {tabs.map((data, index) => {
            return (
              <div
                key={index}
                className={`border-2 rounded-t-xl hover:bg-amber-100 p-2 transition-all cursor-pointer
                  ${activeTab === index ? "bg-amber-200" : "bg-gray-300"}`}
                onClick={() => handleTabsClick(index)}
              >
                <p className="text-xl">{data.tabName}</p>
              </div>
            );
          })}
        </div>
        <div className="tabs-component-container border-2">
          <TabComponent />
        </div>
      </div>
    </>
  );
};

export default Product;
