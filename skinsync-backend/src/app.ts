import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { skinTypeRoutes } from './routes/skinTypeRoutes';
import { recommendationRoutes } from './routes/recommendationRoutes';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/skin-type', skinTypeRoutes);
app.use('/api/recommendations', recommendationRoutes);

mongoose.connect('mongodb://localhost:27017/skinsync', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});