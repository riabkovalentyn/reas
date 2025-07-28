import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import leadRoutes from './routes/leadRoutes';


dotenv.config();

const app: express.Application = express();

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/realestate';

mongoose
    .connect(mongoUri)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

app.use('/api', leadRoutes);

app.get('/health', async (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    uptime: process.uptime(),
    timestamp: Date.now()
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;