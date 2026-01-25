import { useState, useEffect } from "react";
import axios from "axios";

const StockHistory = () => {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState("");
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchingProducts, setFetchingProducts] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setFetchingProducts(true);
            const response = await axios.get(
                "http://localhost:8000/api/v1/products/all-products"
            );
            setProducts(response.data.data);
        } catch (error) {
            console.error("Error fetching products:", error);
            window.alert("Failed to fetch products");
        } finally {
            setFetchingProducts(false);
        }
    };

    const fetchStockHistory = async (productId) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `http://localhost:8000/api/v1/stocks/history/${productId}`
            );
            setHistory(response.data.data);
        } catch (error) {
            console.error("Error fetching stock history:", error);
            window.alert("Failed to fetch stock history");
            setHistory([]);
        } finally {
            setLoading(false);
        }
    };

    const handleProductChange = (e) => {
        const productId = e.target.value;
        setSelectedProductId(productId);
        if (productId) {
            fetchStockHistory(productId);
        } else {
            setHistory([]);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const selectedProduct = products.find((p) => p._id === selectedProductId);

    return (
        <div className="p-8 bg-gradient-to-br from-gray-50 to-slate-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        Stock History
                    </h2>

                    {/* Product Selection */}
                    <div className="mb-8">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Select Product
                        </label>
                        <select
                            value={selectedProductId}
                            onChange={handleProductChange}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                            disabled={fetchingProducts}
                        >
                            <option value="">
                                {fetchingProducts
                                    ? "Loading products..."
                                    : "Choose a product to view history"}
                            </option>
                            {products.map((product) => (
                                <option key={product._id} value={product._id}>
                                    {product.product_name} - {product.product_brand} (SKU:{" "}
                                    {product.product_sku || "N/A"})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Current Stock Display */}
                    {selectedProduct && (
                        <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">
                                        Current Stock Level
                                    </p>
                                    <p className="text-3xl font-bold text-blue-700">
                                        {selectedProduct.product_quantity}{" "}
                                        <span className="text-lg uppercase">
                                            {selectedProduct.product_unit}
                                        </span>
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-600 mb-1">Total Records</p>
                                    <p className="text-3xl font-bold text-indigo-700">
                                        {history.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
                            <p className="mt-4 text-gray-600">Loading stock history...</p>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && !selectedProductId && (
                        <div className="text-center py-12">
                            <svg
                                className="mx-auto h-24 w-24 text-gray-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                            <p className="mt-4 text-gray-500 text-lg">
                                Select a product to view its stock transaction history
                            </p>
                        </div>
                    )}

                    {/* No History State */}
                    {!loading && selectedProductId && history.length === 0 && (
                        <div className="text-center py-12">
                            <svg
                                className="mx-auto h-24 w-24 text-gray-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                />
                            </svg>
                            <p className="mt-4 text-gray-500 text-lg">
                                No transaction history found for this product
                            </p>
                        </div>
                    )}

                    {/* History Table */}
                    {!loading && history.length > 0 && (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gradient-to-r from-gray-100 to-gray-200">
                                        <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider rounded-tl-lg">
                                            Date & Time
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                                            Action
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                                            Reason
                                        </th>
                                        <th className="px-4 py-3 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">
                                            Quantity
                                        </th>
                                        <th className="px-4 py-3 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">
                                            Before
                                        </th>
                                        <th className="px-4 py-3 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">
                                            After
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                                            Reference
                                        </th>
                                        <th className="px-4 py-3 text-left text-sm font-bold text-gray-700 uppercase tracking-wider rounded-tr-lg">
                                            Note
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {history.map((record, index) => (
                                        <tr
                                            key={record._id}
                                            className={`transition-colors hover:bg-gray-50 ${record.stock_action === "IN"
                                                    ? "bg-green-50 hover:bg-green-100"
                                                    : "bg-red-50 hover:bg-red-100"
                                                }`}
                                        >
                                            <td className="px-4 py-3 text-sm text-gray-700">
                                                {formatDate(record.createdAt)}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span
                                                    className={`inline-flex px-3 py-1 rounded-full text-sm font-bold ${record.stock_action === "IN"
                                                            ? "bg-green-200 text-green-800"
                                                            : "bg-red-200 text-red-800"
                                                        }`}
                                                >
                                                    {record.stock_action}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm font-medium text-gray-700">
                                                {record.reason}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <span
                                                    className={`text-lg font-bold ${record.stock_action === "IN"
                                                            ? "text-green-600"
                                                            : "text-red-600"
                                                        }`}
                                                >
                                                    {record.stock_action === "IN" ? "+" : "-"}
                                                    {record.stock_quantity}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right text-sm text-gray-600">
                                                {record.stock_before}
                                            </td>
                                            <td className="px-4 py-3 text-right text-sm font-semibold text-gray-800">
                                                {record.stock_after}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                {record.reference || "-"}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-600">
                                                {record.note || "-"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StockHistory;
