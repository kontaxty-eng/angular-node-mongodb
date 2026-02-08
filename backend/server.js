const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const tasksRoutes = require('./src/routes/tasks.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

// Register routes
app.use('/tasks', tasksRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});