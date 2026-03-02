# 🛍️ MiniStore - Professional MERN E-Commerce Platform

MiniStore is a modern, full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js). It features a premium "Glassmorphism" design system, professional loading states, and a robust backend architecture.

![Project Overview](images/product%20page.png)


## ✨ Key Features

### 🎨 Professional UI/UX
- **Glassmorphism Design**: High-end aesthetic with frosted-glass effects and vibrant gradients.
- **Skeleton Loaders**: Smooth, shimmer-effect loading states for Home, Product Details, and Cart pages.
- **Fade-in Transitions**: Elegant content reveals using CSS animations.
- **Responsive Layout**: Optimized for all devices using a centralized `MainLayout` system.

### 🛒 E-Commerce Functionality
- **Product Discovery**: Advanced filtering by category and real-time search functionality.
- **Detailed Product Views**: Comprehensive product information with image fallbacks and stock indicators.
- **Dynamic Cart**: Real-time cart updates, quantity controls, and summary calculations.
- **Secure Checkout**: Streamlined order placement flow.

### 🔐 Backend & Security
- **JWT Authentication**: Secure user login and registration.
- **Admin Dashboard**: Specialized access for product management and uploads.
- **Image Uploads**: Centralized Multer configuration with previews and validation.
- **RESTful API**: Clean, controller-based architecture for maintainable code.

## 📸 Interface Preview

| Homepage | Product Details |
|----------|-----------------|
| ![Homepage](images/product%20page.png) | ![Details](images/product-detailed%20page.png) |

| Cart Management | Authentication |
|-----------------|----------------|
| ![Cart](images/cart%20page.png) | ![Login](images/login%20page.png) |

## 🛠️ Technical Stack

- **Frontend**: React, Vite, React Router, Lucide Icons, Vanilla CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose ODM)
- **Auth**: JSON Web Tokens (JWT), BcryptJS
- **File Handling**: Multer

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)

### Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd basic-project
   ```

2. **Backend Configuration**
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5001
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   ```

3. **Install Dependencies**
   ```bash
   # Root/Frontend
   npm install

   # Backend
   cd server
   npm install
   ```

4. **Run the Application**
   ```bash
   # Run Backend (from /server)
   npm run dev

   # Run Frontend (from /)
   npm run dev
   ```

## 📂 Project Structure

- `server/controllers`: Business logic for handling requests.
- `server/routes`: API endpoint definitions.
- `server/middleware`: Auth and file upload configurations.
- `src/components`: Reusable UI elements (Layout, Product, Cart, Common).
- `src/pages`: Application views (Home, ProductDetails, Cart, etc.).
- `src/context`: Global state management for Auth, Cart, and Products.

---
*Built with ❤️ by Abhiram Rangoon.*
