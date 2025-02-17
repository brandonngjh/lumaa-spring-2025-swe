import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import tasksRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
