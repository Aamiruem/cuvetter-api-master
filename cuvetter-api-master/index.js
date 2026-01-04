require('dotenv').config();
import authRoutes from "./routes/auth.js";
import connectDB from "./config/db.js";

import express, { json } from 'express';
import { connect } from 'mongoose';
import authRoutes from './routes/auth';
import jobRoutes from './routes/jobs';
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions ={
    origin:'*',
    credentials:true,
    optionSuccessStatus:200,
}

app.use(cors(corsOptions))

connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Test!');
});

app.use(json());
app.use('/auth', authRoutes);
app.use('/jobs', jobRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
