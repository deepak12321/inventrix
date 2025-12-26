# InventoryMS (Inventrix) - Project Context Document

**Last Updated:** December 26, 2025  
**Author:** Deepak Phulara  
**Version:** 1.0.0

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Database Schema](#database-schema)
5. [API Endpoints](#api-endpoints)
6. [Features Implemented](#features-implemented)
7. [Current Status](#current-status)
8. [Known Issues & Limitations](#known-issues--limitations)
9. [Pending Features](#pending-features)
10. [Environment Configuration](#environment-configuration)

---

## Project Overview

**InventoryMS (Inventrix)** is a comprehensive inventory management system designed to track products and stock movements efficiently. The system provides RESTful APIs for managing product information, stock levels, and transaction history.

### Key Capabilities
- Product catalog management with detailed attributes
- Stock tracking with transaction history
- Support for multiple stock actions (IN/OUT)
- Cloudinary integration for image uploads (in progress)
- MongoDB database for persistent storage

---

## Technology Stack

### Backend
- **Runtime:** Node.js with ES6 Modules
- **Framework:** Express.js v5.2.1
- **Database:** MongoDB with Mongoose ORM v9.0.1
- **File Upload:** Multer v2.0.2
- **Cloud Storage:** Cloudinary v2.8.0
- **Environment Management:** dotenv v17.2.3
- **HTTP Client:** Axios v1.13.2
- **CORS:** cors v2.8.5
- **Dev Tool:** Nodemon v3.1.11

### Frontend
- **Status:** Not yet implemented (empty directory exists)

---

## Project Structure

```
InventoryMS/
│
├── backend/
│   ├── controllers/
│   │   ├── product.controller.js    # Product CRUD operations
│   │   └── stock.controller.js      # Stock management logic
│   │
│   ├── models/
│   │   ├── product.models.js        # Product schema
│   │   └── stocks.models.js         # Stock transaction schema
│   │
│   ├── routes/
│   │   ├── products.routes.js       # Product API routes
│   │   └── stocks.routes.js         # Stock API routes
│   │
│   ├── middleware/
│   │   └── multer.middleware.js     # File upload configuration
│   │
│   ├── utility/
│   │   └── cloudinary.utility.js    # Cloudinary upload helper
│   │
│   ├── db/
│   │   └── index.db.js             # MongoDB connection setup
│   │
│   ├── src/
│   │   ├── app.js                  # Express app configuration
│   │   └── index.js                # Server entry point
│   │
│   ├── .env                        # Environment variables
│   └── package.json                # Dependencies
│
├── frontend/                       # Empty (not implemented yet)
│
└── README.md                       # Basic project info
```

---

## Database Schema

### Product Model (`product.models.js`)

```javascript
{
  product_category: String (required),
  product_name: String (required, unique),
  product_brand: String (required),
  product_category_lower: String (lowercase, for search),
  product_brand_lower: String (lowercase, for search),
  product_name_lower: String (lowercase, for search),
  product_image: String (default placeholder URL),
  product_cost_price: Number (required, default: 0),
  product_unit: String (default: "pcs"),
  product_tax: Number (required, min: 0, max: 100),
  product_selling_price: Number (required, default: 0),
  product_quantity: Number (required, default: 1, min: 0),
  product_min_quantity: Number (default: 5),
  product_sku: String (unique, sparse),
  is_active: Boolean (default: true),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Example Product:**
```json
{
  "product_category": "Electronics",
  "product_name": "Apple iPhone 15",
  "product_brand": "Apple",
  "product_image": "https://example.com/images/iphone15.png",
  "product_cost_price": 65000,
  "product_unit": "pcs",
  "product_tax": 18,
  "product_selling_price": 78000,
  "product_quantity": 50,
  "product_min_quantity": 5,
  "product_sku": "SKU-IP15-001"
}
```

### Stock Model (`stocks.models.js`)

```javascript
{
  product: ObjectId (ref: "Product", required),
  stock_action: String (enum: ["IN", "OUT"], required),
  stock_quantity: Number (required, min: 1),
  reason: String (enum: ["PURCHASE", "SALE", "RETURN", "DAMAGE", "ADJUSTMENT"], required),
  reference: String (optional - bill/invoice/note),
  stock_before: Number (required),
  stock_after: Number (required),
  note: String (optional),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

**Validation Rules:**
- **IN** actions: Valid reasons are PURCHASE, RETURN, ADJUSTMENT
- **OUT** actions: Valid reasons are SALE, DAMAGE, ADJUSTMENT

---

## API Endpoints

### Base URL
```
http://localhost:5000/api/v1
```

### Product Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/products/add-product` | Create new product | All product fields (see schema) |
| GET | `/products/find-product?product_name=X&product_brand=Y` | Search products | Query params: product_name, product_brand (at least one required) |
| DELETE | `/products/delete-product` | Delete product | `{ product_id: "..." }` |
| PATCH | `/products/update-product/:id` | Update product fields | Allowed fields: category, name, brand, image, cost_price, selling_price, tax, unit, min_quantity, is_active |

### Stock Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/stocks/update-stocks` | Record stock transaction | `{ productId, stock_action, stock_quantity, reason, reference?, note? }` |

### Root Endpoint
```
GET / → Returns welcome message
```

---

## Features Implemented

### ✅ Product Management
1. **Create Products**
   - Full validation for required fields
   - Duplicate prevention (same name + brand)
   - Auto-generates lowercase fields for case-insensitive search
   - Default placeholder image support

2. **Search Products**
   - Search by product name, brand, or both
   - Returns detailed search criteria and results count

3. **Delete Products**
   - Simple deletion by product ID

4. **Update Products**
   - Selective field updates
   - Validation for ObjectId
   - Change detection (prevents empty updates)

### ✅ Stock Management
1. **Stock Transactions**
   - Record IN/OUT movements
   - Validates action-reason combinations
   - Prevents negative stock for OUT actions
   - Captures before/after stock levels
   - Optional reference and notes

### ✅ Infrastructure
1. **Database Connection**
   - MongoDB connection with Mongoose
   - Error handling and connection status logging

2. **Middleware**
   - CORS enabled for cross-origin requests
   - JSON body parser (32kb limit)
   - URL-encoded data support
   - Multer for file uploads (disk storage in `/temp`)

3. **Error Handling**
   - Consistent error responses
   - Detailed console logging
   - HTTP status codes (200, 400, 404, 409, 500)

---

## Current Status

### 🟢 Working Features
- ✅ Backend server setup and running
- ✅ MongoDB database connection
- ✅ Product CRUD operations (Create, Read, Update, Delete)
- ✅ Stock movement tracking
- ✅ Input validation and error handling
- ✅ Case-insensitive search capability
- ✅ Multer middleware configured for file uploads

### 🟡 In Progress / Incomplete
- ⚠️ **Cloudinary Integration**: Utility file exists but has bugs
  - Line 16: References undefined variable `file_path` (should be `file_details`)
  - Not integrated into product controller yet (see line 3 comment)
  - No `/upload-img` route is active (commented out in routes)

- ⚠️ **Frontend**: Directory exists but completely empty

- ⚠️ **Stock Updates Not Reflected in Products**: The `updateStock` controller creates stock transaction records but doesn't update the `product_quantity` in the Product model

### 🔴 Not Started
- ❌ Frontend application
- ❌ Stock history retrieval endpoint (commented in routes: `// history/:productId`)
- ❌ Category-based product search (commented in routes)
- ❌ Authentication/Authorization
- ❌ User management
- ❌ Reports/Analytics
- ❌ Low stock alerts/notifications

---

## Known Issues & Limitations

### Critical Issues
1. **Cloudinary Utility Bug** (`cloudinary.utility.js:16`)
   ```javascript
   // ISSUE: file_path is undefined, should be file_details
   const uploadResponse = cloudinary.uploader.upload(file_path, { ... })
   ```

2. **Stock Quantity Not Syncing**
   - Stock transactions are recorded in the Stock model
   - However, `product_quantity` in Product model is NOT updated
   - This leads to inventory discrepancy

3. **Missing Temp Directory**
   - Multer is configured to save to `./temp` but directory may not exist
   - Should create directory or handle missing directory error

### Validation Gaps
1. **Product Validation**
   - No validation for negative prices
   - Tax limited to 0-100 but no precision validation
   - SKU format not validated

2. **Stock Validation**
   - Missing required field checks before processing
   - No validation for negative quantities

### Code Quality Issues
1. **Unused Imports**: Multer middleware imported but not used in routes
2. **Commented Code**: Multiple commented routes suggest incomplete features
3. **Error Response Inconsistency**: Some endpoints return error objects, others don't
4. **Mongoose Import Missing**: `product.controller.js:187` uses `mongoose.Types.ObjectId` but mongoose is not imported

---

## Pending Features

### High Priority
1. **Fix Cloudinary Integration**
   - Correct the variable name bug
   - Integrate with product creation/update
   - Add image upload route

2. **Sync Stock with Product Quantity**
   - Update `product_quantity` when stock transactions occur
   - Add transaction rollback on failure

3. **Frontend Development**
   - Create React/Vue frontend
   - Product listing and management UI
   - Stock movement interface
   - Dashboard with analytics

### Medium Priority
4. **Stock History Endpoint**
   ```javascript
   GET /api/v1/stocks/history/:productId
   ```

5. **Category-based Search**
   ```javascript
   GET /api/v1/products/find-product/category?category=Electronics
   ```

6. **Low Stock Alerts**
   - Endpoint to fetch products below `product_min_quantity`
   - Email/notification integration

### Low Priority
7. **Bulk Operations**
   - Bulk product import (CSV/Excel)
   - Bulk stock updates

8. **Advanced Features**
   - Product variants (size, color, etc.)
   - Supplier management
   - Purchase order tracking
   - Sales analytics

---

## Environment Configuration

### Required Environment Variables (`.env`)

```env
# Server Configuration
PORT=5000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/inventrix
# OR MongoDB Atlas connection string

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Running the Application

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment**
   - Create `.env` file in `backend/` directory
   - Add required environment variables

3. **Start MongoDB**
   - Ensure MongoDB is running locally or use MongoDB Atlas

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   - Server runs on `http://localhost:5000`
   - Uses nodemon for auto-restart

---

## Development Workflow

### Current Development Approach
- **Backend-First**: API development completed before frontend
- **Testing**: Manual testing via Postman/Thunder Client (no automated tests)
- **Version Control**: Git initialized (`.git` directory exists)

### Next Steps for Development
1. Fix critical bugs in Cloudinary utility
2. Implement stock-product quantity synchronization
3. Add stock history endpoint
4. Begin frontend development
5. Add comprehensive error handling
6. Write API documentation (Swagger/OpenAPI)
7. Add unit and integration tests

---

## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": { ... } // Optional
}
```

---

## Summary for ChatGPT/AI Assistants

**What this project is:**  
A Node.js/Express inventory management system with MongoDB, currently backend-only, that tracks products and stock movements through RESTful APIs.

**What works:**  
Product CRUD operations, stock transaction recording, MongoDB integration, input validation, and basic error handling.

**What doesn't work:**  
Cloudinary file upload has a bug, stock updates don't sync with product quantities, frontend doesn't exist, and several planned endpoints are commented out.

**Tech proficiency level:**  
Junior to intermediate - the code shows understanding of Express patterns, Mongoose schemas, and async/await, but has some code quality issues like missing imports, inconsistent error handling, and features left incomplete.

**Best approach for assistance:**  
1. Ask about specific features or bug fixes
2. Provide code samples for missing functionality
3. Suggest architectural improvements
4. Help with frontend integration planning
5. Recommend best practices for production readiness

---

**End of Context Document**
