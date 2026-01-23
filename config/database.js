require("dotenv").config();
const { MongoClient } = require('mongodb');

// Use a global variable to reuse connection across serverless invocations
let db = null;
let client = null;

// MongoDB connection URL from environment or default to local
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'petstore';

/**
 * Connect to MongoDB (works for both local and serverless/Vercel)
 */
async function connectToDatabase() {
    // If we have a connection, reuse it
    if (db) {
        return db;
    }

    try {
        // Create new client and connect
        client = new MongoClient(MONGODB_URI, {
            maxPoolSize: 10, // Maximum pool size for connections
            minPoolSize: 2,  // Minimum pool size
            serverSelectionTimeoutMS: 5000, // Timeout for server selection
            socketTimeoutMS: 45000, // Socket timeout
        });

        await client.connect();
        db = client.db(DB_NAME);

        if (process.env.NODE_ENV !== 'production') {
            console.log('MongoDB connected successfully');
        }

        return db;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        db = null;
        client = null;
        throw error;
    }
}

/**
 * Get database instance (auto-connects if needed)
 */
async function getDb() {
    if (!db) {
        return await connectToDatabase();
    }
    return db;
}

/**
 * Close database connection (mainly for local development)
 */
async function closeDatabase() {
    if (client) {
        await client.close();
        db = null;
        client = null;
        if (process.env.NODE_ENV !== 'production') {
            console.log('MongoDB connection closed');
        }
    }
}

module.exports = {
    connectToDatabase,
    getDb,
    closeDatabase
};
