import Product from "../models/product.models.js";
import uploadToCloudnary from "../utility/cloudinary.utility.js";

// cloudnary feature implementation left

const saveProductDetails = async (request, response) => {
  // save product to database
  try {
    const {
      product_category,
      product_sub_category,
      product_name,
      product_brand,
      product_cost_price,
      product_unit,
      product_tax,
      product_selling_price,
      product_quantity,
      product_min_quantity,
      product_sku,
      is_active,
    } = request.body;

    const { path } = request.file;
    console.log("hohooohohohohohoh", request.file);

    const cloudnaryUploadStatus = await uploadToCloudnary(path);
    console.log("cloudnary upload status");
    console.log(cloudnaryUploadStatus.secure_url);

    // Validate required fields before processing
    const requiredFields = {
      product_category,
      product_sub_category,
      product_name,
      product_brand,
    };

    const missingFields = [];
    for (const [fieldName, fieldValue] of Object.entries(requiredFields)) {
      if (!fieldValue || fieldValue.trim() === "") {
        missingFields.push(fieldName);
      }
    }

    if (missingFields.length > 0) {
      return response.status(400).json({
        success: false,
        message: `Required fields are missing or empty: ${missingFields.join(
          ", ",
        )}`,
      });
    }

    // finding if the data exist already
    const findResult = await Product.findOne({
      product_name,
      product_brand,
    });
    if (findResult != null) {
      return response.status(409).json({
        success: false,
        message: "Product Exist in Inventory!",
      });
    }

    const productData = {
      product_category,
      product_sub_category,
      product_name,
      product_brand,
      product_category_lower: product_category.toLowerCase(),
      product_sub_category_lower: product_sub_category.toLowerCase(),
      product_brand_lower: product_brand.toLowerCase(),
      product_name_lower: product_name.toLowerCase(),
      product_image: cloudnaryUploadStatus.secure_url,
      product_image_public_id: cloudnaryUploadStatus.public_id,
      product_unit,
      product_tax,
      product_cost_price,
      product_selling_price,
      product_quantity,
      product_min_quantity,
      product_sku,
      is_active,
    };

    // console.log(uploadData);

    const uploadResult = await Product.create(productData);
    console.log(uploadResult);

    // console.log(productData);
    return response.status(200).json({
      success: true,
      message: "Data Recieved successfully",
      data: uploadResult,
    });
  } catch (error) {
    console.log("error while saving the data (saveProductsDetails) :-", error);
    response.status(404).json({
      success: false,
      message:
        "something went wrong in product controller (saveProductDetails)",
      error: error,
    });
  }
};

const getProductDetails = async (request, response) => {
  // fetch product from database
  try {
    const { product_name, product_brand } = request.query;
    console.log(product_name);

    if (!product_name && !product_brand) {
      return response.status(400).json({
        success: false,
        message: `Please Provide atleast one matching criteria`,
      });
    }

    let searchResult = {
      search_criteria: "",
      data: [],
    };

    if (product_name && product_brand) {
      searchResult.search_criteria = `${product_name} and ${product_brand}`;
      searchResult.data = await Product.find({
        product_name,
        product_brand,
      });
    } else if (product_name) {
      searchResult.search_criteria = `${product_name}`;
      searchResult.data = await Product.find({ product_name });
    } else if (product_brand) {
      searchResult.search_criteria = `${product_brand}`;
      searchResult.data = await Product.find({ product_brand });
    }

    if (searchResult.data.length == 0) {
      return response.status(404).json({
        success: false,
        message: `No result found matching ${searchResult.search_criteria} `,
      });
    }

    return response.status(200).json({
      success: true,
      message: `Found ${searchResult.data.length} products.`,
      data: searchResult,
    });
  } catch (error) {
    console.log(
      "Something went wrong while fetching data. (getProductDetails) :- ",
      error,
    );
    return response.status(500).json({
      success: false,
      message: `Something went wrong while fetching the data.`,
    });
  }
};

const getProdyctbyCategory = async (request, response) => {
  try {
    const { categoryName } = request.params;

    if (!categoryName) {
      return response.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const data = await Product.find({
      product_category_lower: categoryName.toLowerCase(),
      is_active: true,
    });

    return response.status(200).json({
      success: true,
      message: "Category Fetched Successfully",
      data: data,
    });
  } catch (error) {
    console.log("An error occurred while fetching Category", error);
    return response.status(500).json({
      success: false,
      message: "Failed to fetch Category",
    });
  }
};

const getAllCategory = async (request, response) => {
  try {
    const data = await Product.distinct("product_category");
    console.log(data);
    return response.status(200).json({
      success: true,
      message: "Category Fetched Successfully",
      data: data,
    });
  } catch (error) {
    console.log("An error occurred while fetching Category", error);
    return response.status(500).json({
      success: false,
      message: "Failed to fetch Category",
    });
  }
};

const getSubcategoriesByCategory = async (request, response) => {
  try {
    const { categoryName } = request.params;

    if (!categoryName) {
      return response.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const data = await Product.distinct("product_sub_category", {
      product_category_lower: categoryName.toLowerCase(),
      is_active: true,
    });

    return response.status(200).json({
      success: true,
      message: "Subcategories Fetched Successfully",
      data: data,
    });
  } catch (error) {
    console.log("An error occurred while fetching Subcategories", error);
    return response.status(500).json({
      success: false,
      message: "Failed to fetch Subcategories",
    });
  }
};

const deleteProduct = async (request, response) => {
  // delete product form database

  try {
    // const { product_id } = request.body;
    const { product_id } = request.params;

    console.log("request to delete product with id ", product_id);

    if (!product_id) {
      return response.status(400).json({
        success: false,
        message: "No product is Selected",
      });
    }

    const isDeleted = await Product.deleteOne({ _id: product_id });

    return response.status(200).json({
      success: true,
      message: "Items Deleted",
      data: isDeleted,
    });
  } catch (error) {
    console.log(
      "Error occurred while deleting the Product Detils (deleteProduct) :- ",
      error,
    );
    return response.status(500).json({
      success: false,
      message:
        "Something went wrong while Deleting the Product, Please try again!",
    });
  }
};

const updateEntries = async (request, response) => {
  try {
    const { id } = request.params;

    // 1️⃣ validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    // 2️⃣ find product
    const product = await Product.findById(id);

    if (!product) {
      return response.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // 3️⃣ allowed fields (category excluded, subcategory allowed)
    const allowedUpdates = [
      "product_sub_category",
      "product_name",
      "product_brand",
      "product_image",
      "product_cost_price",
      "product_selling_price",
      "product_tax",
      "product_unit",
      "product_min_quantity",
      "is_active",
    ];

    let changesExist = false;

    // 4️⃣ apply updates safely
    for (const field of allowedUpdates) {
      if (request.body[field] !== undefined) {
        product[field] = request.body[field];
        changesExist = true;

        // Update lowercase field for subcategory
        if (field === "product_sub_category") {
          product.product_sub_category_lower =
            request.body[field].toLowerCase();
        }
      }
    }

    if (!changesExist) {
      return response.status(400).json({
        success: false,
        message: "No valid changes provided",
      });
    }

    // 5️⃣ save document
    const updatedProduct = await product.save();

    return response.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("updateEntries error:", error);
    return response.status(500).json({
      success: false,
      message: "Something went wrong while updating product",
    });
  }
};

const getAllProducts = async (request, response) => {
  try {
    const data = await Product.find({ is_active: true }).sort({ product_name: 1 });

    return response.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: data,
    });
  } catch (error) {
    console.log("An error occurred while fetching all products", error);
    return response.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

export {
  saveProductDetails,
  getProductDetails,
  getAllCategory,
  getSubcategoriesByCategory,
  getProdyctbyCategory,
  deleteProduct,
  updateEntries,
  getAllProducts,
};
