const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = require('./config/db');
const passport = require('./config/passport');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const progressRoutes = require('./routes/progress.routes');
const quizRoutes = require('./routes/quiz.routes');

// Connect to MongoDB
connectDB();

const app = express();

// ─── Security Middleware ───────────────────────────────────────────────────
app.use(helmet());

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { error: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// ─── Body Parsing ─────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── Passport ─────────────────────────────────────────────────────────────
app.use(passport.initialize());

// ─── Logging ──────────────────────────────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ─── Swagger API Docs ─────────────────────────────────────────────────────
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DevOps Buddy API',
      version: '1.0.0',
      description: 'REST API for the DevOps Buddy e-learning platform',
    },
    servers: [
      { url: 'http://localhost:5000', description: 'Development' },
      { url: 'https://your-backend.vercel.app', description: 'Production' },
    ],
    components: {
      securitySchemes: {
        BearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ─── Health Check ─────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

app.get('/health/db', (req, res) => {
  const state = mongoose.connection.readyState;
  const stateMap = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };

  if (state === 1) {
    res.status(200).json({ status: 'ok', db: stateMap[state] });
  } else {
    res.status(503).json({ status: 'error', db: stateMap[state] });
  }
});

// ─── Routes ───────────────────────────────────────────────────────────────
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/quiz', quizRoutes);

// ─── 404 Handler ──────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

// ─── Centralized Error Handler ────────────────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 DevOps Buddy API running on port ${PORT} [${process.env.NODE_ENV}]`);
});

module.exports = app; // export for testing
