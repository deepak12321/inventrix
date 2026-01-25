import { useState } from "react";
import UpdateStock from "./UpdateStock";
import StockHistory from "./StockHistory";

const Stock = () => {
    const [activeTab, setActiveTab] = useState(0);
    const tabs = [
        {
            tabName: "Update Stock",
            component: UpdateStock,
        },
        {
            tabName: "Stock History",
            component: StockHistory,
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

                <div className="tabs-container flex px-5">
                    {tabs.map((data, index) => {
                        return (
                            <div
                                key={index}
                                className={`border-2 rounded-t-xl hover:bg-amber-100 hover:border-amber-300 p-2 transition-all cursor-pointer hover:scale-105 
                  ${activeTab === index ? "bg-amber-200 border-amber-400" : "bg-gray-300 border-gray-400"}`}
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

export default Stock;
