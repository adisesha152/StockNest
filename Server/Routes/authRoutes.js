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
          const email = req.query.email;
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
        const { email, amount } = req.body;
        if (!email || !amount || isNaN(amount)) {
          return res.status(400).json({ error: 'Invalid data format' });
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
        const newBalance = wallet.balance + parseInt(amount);
        await walletsCollection.updateOne({ userId: user._id.toString() }, { $set: { balance: newBalance } });
    
        res.status(200).json({ message: 'Balance added successfully', newBalance });
      } catch (error) {
        console.error('Error adding balance:', error);
        res.status(500).json({ error: 'Error adding balance' });
      }
    });

    router.post('/buy', async (req, res) => {
      try {
        const { email, stockSymbol, company, quantity, price } = req.body;
        if (!email || !stockSymbol || !company || !quantity || !price || isNaN(quantity) || isNaN(price)) {
          return res.status(400).json({ error: 'Invalid data format' });
        }
        const totalPrice = quantity * price;
        const walletsCollection = client.db(dbName).collection(walletCollectionName);
        const wallet = await walletsCollection.findOne({ email });
    
        if (!wallet) {
          return res.status(404).json({ error: 'Wallet not found' });
        }
    
        if (wallet.balance < totalPrice) {
          return res.status(400).json({ error: 'Insufficient balance' });
        }
        const newBalance = wallet.balance - totalPrice;
        const indianTimestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

        await walletsCollection.updateOne({ email }, { $set: { balance: newBalance } });
        const transactionsCollection = client.db(dbName).collection(transactionsCollectionName);
        await transactionsCollection.insertOne({
          email,
          type: 'Buy',
          stockSymbol,
          company,
          quantity,
          price,
          totalPrice,
          timestamp: indianTimestamp,
        });
        
    
        res.status(200).json({ message: 'Stock bought successfully' });
      } catch (error) {
        console.error('Error buying stock:', error);
        res.status(500).json({ error: 'Error buying stock' });
      }
    });

    router.post('/sell', async (req, res) => {
      try {
        const { email, stockSymbol, company, quantity, price } = req.body;
        if (!email || !stockSymbol || !quantity || !price || isNaN(quantity) || isNaN(price)) {
          return res.status(400).json({ error: 'Invalid data format' });
        }
        const transactionsCollection = client.db(dbName).collection(transactionsCollectionName);
        const userStocks = await transactionsCollection.find({ email, stockSymbol }).toArray();
        const totalUserStocks = userStocks.reduce((total, transaction) => total + transaction.quantity, 0);
    
        if (totalUserStocks < quantity) {
          return res.status(400).json({ error: 'Insufficient stocks to sell' });
        }
        const totalPrice = quantity * price;
        const walletsCollection = client.db(dbName).collection(walletCollectionName);
        const wallet = await walletsCollection.findOne({ email });
        const indianTimestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    
        if (!wallet) {
          return res.status(404).json({ error: 'Wallet not found' });
        }
    
        const newBalance = wallet.balance + totalPrice;
        await walletsCollection.updateOne({ email }, { $set: { balance: newBalance } });
        await transactionsCollection.insertOne({
          email,
          type: 'Sell',
          stockSymbol,
          company,
          quantity,
          price,
          totalPrice,
          timestamp: indianTimestamp,
        });
    
        res.status(200).json({ message: 'Stock sold successfully' });
      } catch (error) {
        console.error('Error selling stock:', error);
        res.status(500).json({ error: 'Error selling stock' });
      }
    });

    router.get('/transactions', async (req, res) => {
      try {
        const email = req.query.email;
        if (!email || typeof email !== 'string' || email.trim() === '') {
          return res.status(400).json({ error: 'Invalid email format' });
        }
        const transactionsCollection = client.db
          (
            dbName
          )
          .collection(transactionsCollectionName);
        const transactions = await transactionsCollection.find({ email }).toArray();
        res.status(200).json({ transactions });
      } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Error fetching transactions' });
      }
    }
    );

    router.post('/watchlist', async (req, res) => {
      try {
        const { email, stockSymbol } = req.body;
        if (!email || !stockSymbol) {
          return res.status(400).json({ error: 'Invalid data format' });
        }
        const watchlistCollection = client.db(dbName).collection(watchlistCollectionName);
        const existingWatchlist = await watchlistCollection.findOne({ email, stockSymbol });
    
        if (existingWatchlist) {
          return res.status(400).json({ error: 'Stock already in watchlist' });
        }
        await watchlistCollection.insertOne({ email, stockSymbol });
        res.status(200).json({ message: 'Stock added to watchlist successfully' });
      } catch (error) {
        console.error('Error adding stock to watchlist:', error);
        res.status(500).json({ error: 'Error adding stock to watchlist' });
      }
    }
    );

    router.get('/watchlist', async (req, res) => {
      try {
        const email = req.query.email;
        if (!email || typeof email !== 'string' || email.trim() === '') {
          return res.status(400).json({ error: 'Invalid email format' });
        }
        const watchlistCollection = client.db(dbName).collection(watchlistCollectionName);
        const watchlist = await watchlistCollection.find({ email }).toArray();
        res.status(200).json({ watchlist });
      } catch (error) {
        console.error('Error fetching watchlist:', error);
        res.status(500).json({ error: 'Error fetching watchlist' });
      }
    }
    );

    router.delete('/watchlist', async (req, res) => {
      try {
        const { email, stockSymbol } = req.body;
        if (!email || !stockSymbol) {
          return res.status(400).json({ error: 'Invalid data format' });
        }
        const watchlistCollection = client.db(dbName).collection(watchlistCollectionName);
        await watchlistCollection.deleteOne({ email, stockSymbol });
        res.status(200).json({ message: 'Stock removed from watchlist successfully' });
      } catch (error) {
        console.error('Error removing stock from watchlist:', error);
        res.status(500).json({ error: 'Error removing stock from watchlist' });
      }
    }
    );

    router.get('/logout', async (req, res) => {
      try {
        res.clearCookie('jwt');
        res.status(200).json({ message: 'User logged out successfully' });
      } catch (error) {
        console.error('Error logging out user:', error);
        res.status(500).json({ error: 'Error logging out user' });
      }
    }
    );

    
    

export { router as authRoutes };
