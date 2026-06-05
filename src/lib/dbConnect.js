const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI_CR;
const dbName = process.env.MONGODB_CR;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export function dbConnect(cName) {
  try {
    return client.db(dbName).collection(cName);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}