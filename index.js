require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const { ObjectId } = require("mongodb");
const { connectToDatabase, getDb } = require("./config/database");

const app = express();
const PORT = process.env.PORT || 5000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  },
});

// Middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(limiter);

// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:8080",
  "https://pet-store-client.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Check if origin is in the allowed list
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // For development, we might want to allow all localhost origins dynamically
      if (
        process.env.NODE_ENV === "development" &&
        origin.startsWith("http://localhost:")
      ) {
        return callback(null, true);
      }

      callback(null, true);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
    ],
  }),
);

const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL || "admin@petstore.com",
  password: process.env.ADMIN_PASSWORD || "admin123",
};

// Authentication Middleware
const requireAuth = (req, res, next) => {
  const authCookie = req.cookies.auth;

  if (authCookie === "true") {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: "Authentication required. Please login first.",
    });
  }
};

// Routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Pet Store Server is working!",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    endpoints: {
      pets: "/api/pets",
      auth: {
        login: "/api/auth/login",
        logout: "/api/auth/logout",
      },
    },
  });
});

// ---------- Public Routes ----------

app.get("/api/pets", async (req, res) => {
  try {
    const db = await getDb();
    const pets = await db.collection("pets").find({}).toArray();

    res.json({
      success: true,
      count: pets.length,
      data: pets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching pets",
      error: error.message,
    });
  }
});

/**
 * GET /api/pets/:id
 * Returns a single pet by ID
 */
app.get("/api/pets/:id", async (req, res) => {
  try {
    const db = await getDb();
    const pet = await db
      .collection("pets")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!pet) {
      return res.status(404).json({
        success: false,
        message: `Pet with ID '${req.params.id}' not found`,
      });
    }

    res.json({
      success: true,
      data: pet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching pet",
      error: error.message,
    });
  }
});

// ---------- Authentication Routes ----------

/**
 * POST /api/auth/login
 * Authenticates a user with email and password
 */
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  // Check credentials against hardcoded values
  if (
    email === ADMIN_CREDENTIALS.email &&
    password === ADMIN_CREDENTIALS.password
  ) {
    // Set auth cookie
        res.cookie("auth", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });

    return res.json({
      success: true,
      message: "Login successful",
      data: {
        email: email,
        role: "admin",
      },
    });
  }

  // Invalid credentials
  res.status(401).json({
    success: false,
    message: "Invalid email or password",
  });
});

/**
 * POST /api/auth/logout
 * Clears the authentication cookie
 */
app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("auth", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.json({
    success: true,
    message: "Logout successful",
  });
});

// ---------- Protected Routes ----------

/**
 * POST /api/pets
 * Creates a new pet (protected - requires authentication)
 */
app.post("/api/pets", requireAuth, async (req, res) => {
  try {
    const { name, breed, age, price, category, description, image, inStock } =
      req.body;

    // Validate required fields
    if (!name || !breed || !age || !price || !category || !description) {
      return res.status(400).json({
        success: false,
        message:
          "Name, breed, age, price, category, and description are required",
      });
    }

    // Validate price is a positive number
    if (typeof price !== "number" || price < 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a positive number",
      });
    }

    // Create new pet
    const newPet = {
      name,
      breed,
      age,
      price,
      category,
      description,
      image: image || "https://via.placeholder.com/500",
      inStock: inStock !== undefined ? inStock : true,
      createdAt: new Date(),
    };

    const db = await getDb();
    const result = await db.collection("pets").insertOne(newPet);

    newPet._id = result.insertedId;

    res.status(201).json({
      success: true,
      message: "Pet created successfully",
      data: newPet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating pet",
      error: error.message,
    });
  }
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route '${req.method} ${req.path}' not found`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Export for Vercel
module.exports = app;

// Start server with MongoDB connection
if (require.main === module) {
  (async () => {
    try {
      await connectToDatabase();
      app.listen(PORT, () => {
        console.log("\n===========================================");
        console.log("Pet Store Server is running!");
        console.log(`Port: ${PORT}`);
        console.log(`API Base URL: http://localhost:${PORT}`);
        console.log("===========================================");
        console.log("\nAvailable Endpoints:");
        console.log("  GET    /                - Server health check");
        console.log("  GET    /api/pets        - Get all pets");
        console.log("  GET    /api/pets/:id    - Get pet by ID");
        console.log("  POST   /api/auth/login  - Login");
        console.log("  POST   /api/auth/logout - Logout");
        console.log("  POST   /api/pets        - Create pet (protected)");
        console.log("===========================================\n");
      });
    } catch (error) {
      console.error("Failed to start server:", error);
      process.exit(1);
    }
  })();
}
