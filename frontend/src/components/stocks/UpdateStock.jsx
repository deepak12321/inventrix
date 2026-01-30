import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

const UpdateStock = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formData, setFormData] = useState({
        productId: "",
        stock_action: "IN",
        stock_quantity: "",
        reason: "PURCHASE",
        reference: "",
        note: "",
    });
    const [loading, setLoading] = useState(false);
    const [fetchingProducts, setFetchingProducts] = useState(false);

    // Fetch all products on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setFetchingProducts(true);
            const response = await axios.get(
                `${API_BASE_URL}/api/v1/products/all-products`
            );
            setProducts(response.data.data);
        } catch (error) {
            console.error("Error fetching products:", error);
            window.alert("Failed to fetch products");
        } finally {
            setFetchingProducts(false);
        }
    };

    const handleProductChange = (e) => {
        const productId = e.target.value;
        const product = products.find((p) => p._id === productId);
        setSelectedProduct(product);
        setFormData({ ...formData, productId });
    };

    const handleActionChange = (e) => {
        const action = e.target.value;
        // Set default reason based on action
        const defaultReason = action === "IN" ? "PURCHASE" : "SALE";
        setFormData({ ...formData, stock_action: action, reason: defaultReason });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.productId) {
            window.alert("Please select a product");
            return;
        }
        if (!formData.stock_quantity || formData.stock_quantity <= 0) {
            window.alert("Please enter a valid quantity");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(
                `${API_BASE_URL}/api/v1/stocks/update-stocks`,
                {
                    productId: formData.productId,
                    stock_action: formData.stock_action,
                    stock_quantity: parseInt(formData.stock_quantity),
                    reason: formData.reason,
                    reference: formData.reference,
                    note: formData.note,
                }
            );

            if (response.data.success) {
                window.alert("Stock updated successfully!");
                // Reset form
                setFormData({
                    productId: "",
                    stock_action: "IN",
                    stock_quantity: "",
                    reason: "PURCHASE",
                    reference: "",
                    note: "",
                });
                setSelectedProduct(null);
                // Refresh products to get updated quantities
                fetchProducts();
            }
        } catch (error) {
            console.error("Error updating stock:", error);
            const errorMessage =
                error.response?.data?.message || "Failed to update stock";
            window.alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const getReasonOptions = () => {
        if (formData.stock_action === "IN") {
            return ["PURCHASE", "RETURN", "ADJUSTMENT"];
        } else {
            return ["SALE", "DAMAGE", "ADJUSTMENT"];
        }
    };

    const projectedStock = selectedProduct
        ? formData.stock_action === "IN"
            ? selectedProduct.product_quantity + (parseInt(formData.stock_quantity) || 0)
            : selectedProduct.product_quantity - (parseInt(formData.stock_quantity) || 0)
        : 0;

    return (
        <div className="p-8 bg-gradient-to-br from-gray-50 to-slate-100 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        Update Stock
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Product Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Select Product *
                            </label>
                            <select
                                value={formData.productId}
                                onChange={handleProductChange}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                                disabled={fetchingProducts}
                            >
                                <option value="">
                                    {fetchingProducts ? "Loading products..." : "Choose a product"}
                                </option>
                                {products.map((product) => (
                                    <option key={product._id} value={product._id}>
                                        {product.product_name} - {product.product_brand} (Current
                                        Stock: {product.product_quantity} {product.product_unit})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Stock Action */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Stock Action *
                            </label>
                            <div className="flex gap-4">
                                <label
                                    className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 cursor-pointer transition-all ${formData.stock_action === "IN"
                                        ? "bg-green-100 border-green-500 shadow-md"
                                        : "bg-gray-50 border-gray-300 hover:border-green-400"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="stock_action"
                                        value="IN"
                                        checked={formData.stock_action === "IN"}
                                        onChange={handleActionChange}
                                        className="w-5 h-5"
                                    />
                                    <span className="text-lg font-semibold text-gray-800">
                                        Stock IN (Add)
                                    </span>
                                </label>
                                <label
                                    className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 cursor-pointer transition-all ${formData.stock_action === "OUT"
                                        ? "bg-red-100 border-red-500 shadow-md"
                                        : "bg-gray-50 border-gray-300 hover:border-red-400"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        name="stock_action"
                                        value="OUT"
                                        checked={formData.stock_action === "OUT"}
                                        onChange={handleActionChange}
                                        className="w-5 h-5"
                                    />
                                    <span className="text-lg font-semibold text-gray-800">
                                        Stock OUT (Remove)
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Reason */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Reason *
                            </label>
                            <select
                                name="reason"
                                value={formData.reason}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                            >
                                {getReasonOptions().map((reason) => (
                                    <option key={reason} value={reason}>
                                        {reason}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Quantity *
                            </label>
                            <input
                                type="number"
                                name="stock_quantity"
                                value={formData.stock_quantity}
                                onChange={handleInputChange}
                                min="1"
                                placeholder="Enter quantity"
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                            />
                        </div>

                        {/* Stock Preview */}
                        {selectedProduct && formData.stock_quantity && (
                            <div
                                className={`p-5 rounded-xl border-2 ${projectedStock < 0
                                    ? "bg-red-50 border-red-300"
                                    : "bg-blue-50 border-blue-300"
                                    }`}
                            >
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                    Stock Preview
                                </h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <p className="text-xs text-gray-600 mb-1">Current Stock</p>
                                        <p className="text-2xl font-bold text-gray-800">
                                            {selectedProduct.product_quantity}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 mb-1">Change</p>
                                        <p
                                            className={`text-2xl font-bold ${formData.stock_action === "IN"
                                                ? "text-green-600"
                                                : "text-red-600"
                                                }`}
                                        >
                                            {formData.stock_action === "IN" ? "+" : "-"}
                                            {formData.stock_quantity}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 mb-1">
                                            Projected Stock
                                        </p>
                                        <p
                                            className={`text-2xl font-bold ${projectedStock < 0 ? "text-red-600" : "text-blue-600"
                                                }`}
                                        >
                                            {projectedStock}
                                        </p>
                                    </div>
                                </div>
                                {projectedStock < 0 && (
                                    <p className="mt-3 text-sm text-red-600 font-semibold">
                                        ⚠️ Warning: Insufficient stock for this operation
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Reference */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Reference (Optional)
                            </label>
                            <input
                                type="text"
                                name="reference"
                                value={formData.reference}
                                onChange={handleInputChange}
                                placeholder="Bill number, Invoice number, etc."
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors"
                            />
                        </div>

                        {/* Note */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Note (Optional)
                            </label>
                            <textarea
                                name="note"
                                value={formData.note}
                                onChange={handleInputChange}
                                rows="3"
                                placeholder="Additional notes..."
                                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-xl font-bold text-white text-lg shadow-lg transition-all transform ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 hover:scale-105"
                                }`}
                        >
                            {loading ? "Updating..." : "Update Stock"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateStock;
