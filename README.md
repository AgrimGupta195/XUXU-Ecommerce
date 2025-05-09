# XUXU E-commerce Platform

A modern, full-stack e-commerce platform built with React, Node.js, MongoDB, and Redis.

## Overview

XUXU is a feature-rich e-commerce platform that provides a seamless shopping experience for both customers and administrators. The platform is built using modern web technologies and follows best practices for security, performance, and user experience.

## Features

### Customer Features
- User authentication and authorization
- Product browsing and search
- Shopping cart management
- Secure payment processing
- Order tracking
- Coupon code application
- Wishlist functionality
- Product reviews and ratings

### Admin Features
- Dashboard with analytics
- Product management
- Order management
- User management
- Coupon management
- Sales reporting
- Inventory tracking

## Tech Stack

### Frontend
- **Framework**: React 18 with Vite
- **State Management**: React Context API
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Form Handling**: React Hook Form
- **HTTP Client**: Axios
- **UI Components**: Custom components with Tailwind
- **Build Tool**: Vite
- **Code Quality**: ESLint, Prettier
- **Testing**: Jest, React Testing Library

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Cache & Session**: Redis
- **API Documentation**: Swagger/OpenAPI
- **Environment Management**: dotenv
- **Validation**: express-validator
- **Security**: helmet, cors
- **Testing**: Jest, Supertest

## API Endpoints

### Authentication
```http
POST /api/auth/register
Content-Type: application/json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "user" | "admin"
}

POST /api/auth/login
Content-Type: application/json
{
  "email": "string",
  "password": "string"
}

POST /api/auth/logout
Authorization: Bearer <session-token>
```

### Products
```http
GET /api/products
Query Parameters:
- page: number
- limit: number
- category: string
- sort: string
- search: string

GET /api/products/:id

POST /api/products
Authorization: Bearer <token>
Content-Type: application/json
{
  "name": "string",
  "description": "string",
  "price": number,
  "category": "string",
  "stock": number,
  "images": string[]
}

PUT /api/products/:id
Authorization: Bearer <token>
Content-Type: application/json
{
  "name": "string",
  "description": "string",
  "price": number,
  "category": "string",
  "stock": number,
  "images": string[]
}

DELETE /api/products/:id
Authorization: Bearer <token>
```

### Cart
```http
GET /api/cart
Authorization: Bearer <token>

POST /api/cart
Authorization: Bearer <token>
Content-Type: application/json
{
  "productId": "string",
  "quantity": number
}

PUT /api/cart/:itemId
Authorization: Bearer <token>
Content-Type: application/json
{
  "quantity": number
}

DELETE /api/cart/:itemId
Authorization: Bearer <token>
```

### Orders
```http
GET /api/orders
Authorization: Bearer <token>

GET /api/orders/:id
Authorization: Bearer <token>

POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json
{
  "items": [
    {
      "productId": "string",
      "quantity": number
    }
  ],
  "shippingAddress": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string"
  }
}
```

### Coupons
```http
GET /api/coupons
Authorization: Bearer <token>

POST /api/coupons
Authorization: Bearer <token>
Content-Type: application/json
{
  "code": "string",
  "discount": number,
  "expiryDate": "date",
  "minPurchase": number
}

POST /api/coupons/apply
Authorization: Bearer <token>
Content-Type: application/json
{
  "code": "string"
}
```

### Analytics
```http
GET /api/analytics/sales
Authorization: Bearer <token>
Query Parameters:
- startDate: date
- endDate: date

GET /api/analytics/products
Authorization: Bearer <token>
Query Parameters:
- period: "daily" | "weekly" | "monthly"
```

## Database Schema

### User
```javascript
{
  username: String,
  email: String,
  password: String,
  role: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Product
```javascript
{
  name: String,
  description: String,
  price: Number,
  category: String,
  stock: Number,
  images: [String],
  ratings: [{
    userId: String,
    rating: Number,
    comment: String
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```javascript
{
  userId: String,
  items: [{
    productId: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: String,
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables

### Frontend
```env
VITE_API_URL=http://localhost:5000
```

### Backend
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/xuxu
REDIS_URL=redis://localhost:6379
SESSION_SECRET=your_session_secret
NODE_ENV=development
```

## Project Structure

```
xuxu/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   ├── assets/        # Static assets
│   │   ├── styles/        # Global styles
│   │   └── App.jsx        # Root component
│   ├── public/            # Public assets
│   └── dist/              # Production build
│
└── backend/              # Node.js backend API
    ├── controllers/      # Request handlers
    ├── models/          # Database models
    ├── routes/          # API routes
    ├── middleware/      # Custom middleware
    ├── lib/            # Utility functions
    └── server.js       # Entry point
```

## Frontend Stack

### Core Technologies
- **React 18**: Modern UI library for building user interfaces
- **Vite**: Next-generation frontend build tool
- **TypeScript**: Static typing for better code quality
- **React Router v6**: Client-side routing
- **React Context API**: State management
- **Axios**: HTTP client for API requests

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Headless UI**: Unstyled, accessible UI components
- **React Icons**: Popular icon library
- **React Hook Form**: Form handling and validation
- **React Hot Toast**: Toast notifications
- **React Query**: Server state management
- **Framer Motion**: Animation library

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **Jest**: Testing framework
- **React Testing Library**: Component testing
- **Vite Plugin PWA**: Progressive Web App support

### Key Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.0.0",
    "axios": "^1.6.0",
    "@tanstack/react-query": "^5.0.0",
    "react-hook-form": "^7.0.0",
    "tailwindcss": "^3.0.0",
    "@headlessui/react": "^1.7.0",
    "react-icons": "^4.0.0",
    "framer-motion": "^10.0.0",
    "react-hot-toast": "^2.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "autoprefixer": "^10.0.0",
    "postcss": "^8.0.0",
    "tailwindcss": "^3.0.0",
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "jest": "^29.0.0",
    "@testing-library/react": "^14.0.0"
  }
}
```

### Architecture Overview

#### Component Structure
- **Layout Components**: Header, Footer, Sidebar
- **Page Components**: Home, Products, Cart, Checkout
- **UI Components**: Buttons, Cards, Forms, Modals
- **Shared Components**: Loading, Error, Empty State

#### State Management
- **Context API**: Global state (cart, auth, theme)
- **React Query**: Server state management
- **Local State**: Component-specific state

#### API Integration
- **Axios Instance**: Configured with base URL and interceptors
- **Service Layer**: Organized API calls by feature
- **Error Handling**: Global error handling and retry logic

#### Form Handling
- **React Hook Form**: Form state and validation
- **Custom Hooks**: Reusable form logic

#### Routing
- **Protected Routes**: Authentication required
- **Dynamic Routes**: Product details, user profiles
- **Layout Routes**: Shared layouts for multiple pages
