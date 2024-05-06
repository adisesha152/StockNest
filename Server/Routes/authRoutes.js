import express from 'express';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';

const router = express.Router();

const uri = 'mongodb+srv://Adisesha:Adi123@cluster0.dipykhr.mongodb.net/?retryWrites=true&w=majority';

const dbName = 'StockNest';
const usersCollectionName = 'users';
const stocksCollectionName = 'stocks';
const transactionsCollectionName = 'transactions';
const watchlistCollectionName = 'watchlist';
const walletCollectionName = 'wallet';

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

router.post('/register', async (req, res) => {
    try {
      const { email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        email,
        password: hashedPassword,
      };
    const usersCollection = client.db(dbName).collection(usersCollectionName);
    const { insertedId } = await usersCollection.insertOne(newUser);
  
      const newWallet = {
        userId: insertedId.toString(),
        email : email,
        balance: 100000,
      };

      const walletsCollection = client.db(dbName).collection(walletCollectionName);
      await walletsCollection.insertOne(newWallet);
  
      console.log('User registered successfully:', insertedId);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Error registering user' });
    }
  });  

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const usersCollection = client.db(dbName).collection(usersCollectionName);
        const user = await usersCollection.findOne({ email });
    
        if (!user) {
        return res.status(404).json({ error: 'User not found' });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
    
        if (!isPasswordValid) {
        return res.status(401).json({ error: 'Incorrect password' });
        }
    
        res.status(200).json({ message: 'User logged in successfully' });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Error logging in user' });
    }
    });

    router.get('/balance', async (req, res) => {
      try {
          const email = req.query.email; // Get the email from the request query parameters
          if (!email || typeof email !== 'string' || email.trim() === '') {
              return res.status(400).json({ error: 'Invalid email format' });
          }
    
          const usersCollection = client.db(dbName).collection(usersCollectionName);
          const user = await usersCollection.findOne({ email });
    
          if (!user) {
              return res.status(404).json({ error: 'User not found' });
          }
    
          const walletsCollection = client.db(dbName).collection(walletCollectionName);
          const wallet = await walletsCollection.findOne({ userId: user._id.toString() });
          if (!wallet) {
              return res.status(404).json({ error: 'Wallet not found' });
          }
    
          res.status(200).json({ balance: wallet.balance });
      } catch (error) {
          console.error('Error fetching balance:', error);
          res.status(500).json({ error: 'Error fetching balance' });
      }
    });
    
       
      

    router.post('/add', async (req, res) => {
      try {
        const { email, amount } = req.body; // Extract email and amount from request body
        if (!email || !amount || isNaN(amount)) {
          return res.status(400).json({ error: 'Invalid data format' });
        }
    
        // Find the user based on the email
        const usersCollection = client.db(dbName).collection(usersCollectionName);
        const user = await usersCollection.findOne({ email });
    
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Find the user's wallet using their user ID
        const walletsCollection = client.db(dbName).collection(walletCollectionName);
        const wallet = await walletsCollection.findOne({ userId: user._id.toString() });
    
        if (!wallet) {
          return res.status(404).json({ error: 'Wallet not found' });
        }
    
        // Calculate new balance and update the wallet
        const newBalance = wallet.balance + parseInt(amount);
        await walletsCollection.updateOne({ userId: user._id.toString() }, { $set: { balance: newBalance } });
    
        res.status(200).json({ message: 'Balance added successfully', newBalance });
      } catch (error) {
        console.error('Error adding balance:', error);
        res.status(500).json({ error: 'Error adding balance' });
      }
    });
    
    

export { router as authRoutes };
