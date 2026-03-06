# 🛍️ MiniStore - Professional MERN E-Commerce Platform


MiniStore is a modern, full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js). It features a premium "Glassmorphism" design system, professional loading states, and a robust backend architecture integrated with **Firebase Authentication**.

## 📸 Interface Preview

| Homepage | Product Details |
|----------|-----------------|
| ![Homepage](images/homepage.png) | ![Details](images/productdetail.png) |

| Cart Management | Authentication |
|-----------------|----------------|
| ![Cart](images/cart.png) | ![Login](images/login.png) |


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
- **Unique Badge Count**: The cart icon badge displays the count of *unique* products, not the total quantity, for a cleaner UI.
- **Secure Checkout**: Streamlined order placement with automatic cart clearing and notifications.

### 🔐 Backend & Security
- **Firebase Authentication**: Industry-standard secure user management using Firebase SDK for both Frontend and Backend.
- **MERN Synchronization**: Seamlessly syncs Firebase users with MongoDB to persist roles (Admin/User) and order history.
- **Admin Dashboard**: Specialized access for product management and uploads.
- **Image Uploads**: Centralized Multer configuration for product images.
- **Dual Auth Support**: Backend middleware supports both Firebase ID tokens and legacy JWTs for smooth transitions.


## 🛠️ Technical Stack

- **Frontend**: React, Vite, React Router, Firebase Client SDK, Lucide Icons, Vanilla CSS
- **Backend**: Node.js, Express, Firebase Admin SDK
- **Database**: MongoDB (Mongoose ODM)
- **Auth**: Firebase Authentication (ID Tokens)
- **File Handling**: Multer

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally on `27017`)
- Firebase Project (for Auth credentials)

### Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Mini-Web-Store
   ```

2. **Backend Configuration**
   Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5001
   MONGO_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_legacy_secret
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=your-client-email
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour\nKey\nHere\n-----END PRIVATE KEY-----\n"
   ```

3. **Frontend Configuration**
   Update `frontend/src/firebase.js` with your Firebase web configuration (apiKey, authDomain, etc.).

4. **Install Dependencies**
   ```bash
   # From the root directory
   npm run install-all # If a root script exists, otherwise:
   
   cd frontend && npm install
   cd ../backend && npm install
   ```

5. **Seed Database**
   ```bash
   cd backend
   npm run data:import
   ```

6. **Run the Application**
   ```bash
   # In one terminal (Backend)
   cd backend
   npm run dev
   
   # In another terminal (Frontend)
   cd frontend
   npm run dev
   ```

## 📂 Project Structure

- `backend/controllers`: API logic and user synchronization.
- `backend/middleware`: Firebase auth verification and Multer setup.
- `backend/models`: Mongoose schemas for User, Product, and Cart.
- `frontend/src/components`: Reusable UI elements and layout.
- `frontend/src/context`: Global state management for Firebase Auth and Cart.
- `frontend/src/api`: Axios interceptors for handling Firebase tokens.

---
*Built with ❤️ and developed by Abhiram Rangoon.*
