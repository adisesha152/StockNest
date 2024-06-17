// import mongoose from 'mongoose';
// import { MongoClient,ServerApiVersion } from 'mongodb';

// const uri = 'mongodb+srv://Adisesha:Adi123@cluster0.dipykhr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// const client = new MongoClient(uri, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     }
//   });

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();
//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//       } finally {
//         // Ensures that the client will close when you finish/error
//         await client.close();
//       }
// }

// run().catch(console.dir);

// mongoose.connect('mongodb+srv://Adisesha:Adi123@cluster0.dipykhr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
// {
//     useNewUrlParser: true,
//      useUnifiedTopology: true
//     }).then(() => {
//         console.log("Database connected");
//     }).catch((err) => {
//         console.log(err);
//     })


import express from 'express';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

// const router = express.Router();

const uri = 'mongodb+srv://Adisesha:Adi123@cluster0.dipykhr.mongodb.net/?retryWrites=true&w=majority';

// MongoDB Database Name
const dbName = 'StockNest';

// Connect to MongoDB
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