import { MongoClient } from 'mongodb';
const uri = 'mongodb+srv://Adisesha:Adi123@cluster0.dipykhr.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'StockNest';
const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongoDB();