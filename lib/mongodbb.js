// File: lib/mongodb.js
import { MongoClient } from 'mongodb';

// Retrieve MongoDB URI from environment variables
const uri = process.env.MONGODB_URI;

// For debugging - remove in production
console.log('MongoDB URI:', uri);

let client;
let clientPromise;

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

// Handle connection for development and production
if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable to preserve connection across hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new connection
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Export the connection promise
export default clientPromise;