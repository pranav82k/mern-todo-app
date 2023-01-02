import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import todosRoutes from './routes/todos.js';

const app = express();
dotenv.config();

// Setup Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/todos', todosRoutes);

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Server</h1>");
})

mongoose.connect(process.env.mongodb).then(() => {
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}).catch((err) => console.log(err, "I m here"));

app.use((req, res) => {
    res.status(404).json({error: `Invalid Request ${req.originalUrl}`});
})
const PORT = process.env.PORT || 5000;