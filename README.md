<div align="center">

  # 🐾 Pet Store Server

  **A robust REST API server for pet store management**

  [![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js)](https://nodejs.org)
  [![Express](https://img.shields.io/badge/Express-5.2-000000?logo=express)](https://expressjs.com)
  [![MongoDB](https://img.shields.io/badge/MongoDB-6.0%2B-47A248?logo=mongodb)](https://www.mongodb.com)
  [![License](https://img.shields.io/badge/License-ISC-blue)](LICENSE)

  <!-- Server Link Section -->
  <div id="server-link">

  ### 🌐 Live Server

  | Environment | URL |
  |-------------|-----|
  | **Production** | [https://pet-store-server.vercel.app](https://pet-store-server.vercel.app) |
  | **Local** | [http://localhost:5000](http://localhost:5000) |

  </div>

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [Made With ❤️](#-made-with-)

---

## 🎯 Overview

Pet Store Server is a fully-featured REST API built for managing a pet store inventory. It provides endpoints for browsing pets, authentication, and admin-protected routes for adding new pets to the store.

**Perfect for:** MERN stack projects, e-commerce learning, and API integration practice.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **Cookie-based Auth** | Secure authentication with httpOnly cookies |
| 🐕 **Pet Inventory** | Browse and search pets with detailed information |
| 🛡️ **Protected Routes** | Admin-only endpoints for creating pets |
| 🔍 **Single Pet Lookup** | Fetch individual pets by ID |
| ✅ **Input Validation** | Request validation on all endpoints |
| 🚀 **Production Ready** | Configured for Vercel deployment |
| 📝 **Comprehensive Docs** | Full API documentation included |
| 🗄️ **MongoDB** | Scalable database with Mongoose ODM |

---

## 🛠 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB

### Middleware
- **CORS** - Cross-origin resource sharing
- **cookie-parser** - Cookie parsing
- **dotenv** - Environment configuration

### DevOps
- **Vercel** - Serverless deployment platform

---

## 🚀 API Endpoints

### Base URL
```
Production: https://pet-store-server.vercel.app
Local:      http://localhost:5000
```

### Public Routes

#### `GET /`
Server health check

#### `GET /api/pets`
Get all pets in the store

**Response:**
```json
{
  "success": true,
  "count": 20,
  "data": [
    {
      "id": "678abc123...",
      "name": "Golden Retriever",
      "breed": "Golden Retriever",
      "age": 2,
      "price": 899.99,
      "category": "dog",
      "description": "Friendly and loyal companion...",
      "image": "https://...",
      "inStock": true,
      "createdAt": "2024-01-21T..."
    }
  ]
}
```

#### `GET /api/pets/:id`
Get a single pet by ID

#### `POST /api/auth/login`
Login with credentials (sets auth cookie)

**Request:**
```json
{
  "email": "admin@petstore.com",
  "password": "admin123"
}
```

#### `POST /api/auth/logout`
Logout (clears auth cookie)

### Protected Routes (Require Authentication)

#### `POST /api/pets`
Add a new pet (admin only)

**Request:**
```json
{
  "name": "Siamese Cat",
  "breed": "Siamese",
  "age": 1,
  "price": 499.99,
  "category": "cat",
  "description": "Elegant and vocal...",
  "image": "https://...",
  "inStock": true
}
```

---

## 🏁 Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas account

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/pet-store-server.git
cd pet-store-server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Start the server
npm start
```

### Running Locally

```bash
npm start
# Server runs on http://localhost:5000
```

### Deployment to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb://localhost:27017/petstore
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/petstore

# CORS (optional, for production)
FRONTEND_URL=http://localhost:3000
```

---

## 📁 Project Structure

```
server/
├── index.js           # Main server file
├── models/
│   └── Pet.js         # Pet Mongoose model
├── config/
│   └── database.js    # MongoDB connection
├── data/
│   └── pets.seed.js   # 20 sample pets for seeding
├── vercel.json        # Vercel configuration
├── .env               # Environment variables
├── .gitignore         # Git ignore rules
├── package.json       # Dependencies and scripts
├── API_DOCS.md        # Detailed API documentation
└── README.md          # This file
```

---

## 🗄 Database Schema

### Pet Model

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | String | ✅ | Pet name |
| `breed` | String | ✅ | Pet breed |
| `age` | Number | ✅ | Age in years |
| `price` | Number | ✅ | Price in USD |
| `category` | String | ✅ | dog, cat, bird, etc. |
| `description` | String | ✅ | Pet description |
| `image` | String | ❌ | Image URL |
| `inStock` | Boolean | ✅ | Availability status |
| `createdAt` | Date | Auto | Timestamp |

### Seed Database

```bash
# Seed 20 pets to MongoDB
node data/pets.seed.js
```

---

## 👤 Made With ❤️

**Developed by [Mujahidul Islam]**

<div align="center">

### 🛠 Built Using

![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.2-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0%2B-47A248?logo=mongodb&logoColor=white)

### 📬 Connect With Me

[![GitHub](https://img.shields.io/badge/GitHub-FollowMe-181717?logo=github&logoColor=white)](https://github.com/yourusername)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?logo=linkedin&logoColor=white)](https://linkedin.com/in/yourusername)
[![Twitter](https://img.shields.io/badge/Twitter-Follow-1DA1F2?logo=twitter&logoColor=white)](https://twitter.com/yourusername)

---

### 🌟 Star This Repository

If you found this project helpful, please consider giving it a star!

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/pet-store-server&type=Date)](https://star-history.com/#yourusername/pet-store-server&Date)

---

**⚡ Powered by Express.js & MongoDB**

</div>
