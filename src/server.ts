import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { taskRoutes } from './routes/taskRoutes';
import { createError, errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', taskRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Route not found handler (should be after all routes)
app.use((req, res, next) => {
  next(createError(`${req.method} ${req.originalUrl} not found`, 404));
});

// Error handling middleware (should be last)
app.use(errorHandler);

// Start server (only if not in test environment)
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📋 Task Manager API ready!`);
  });
}

export { app }; 