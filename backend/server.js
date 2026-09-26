import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';

import connectDB from './config/db.js';
import healthRoutes from './routes/healthRoutes.js';
import countryRoutes from './routes/countryRoutes.js';
import universityRoutes from './routes/universityRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import scholarshipRoutes from './routes/scholarshipRoutes.js';
import enquiryRoutes from './routes/enquiryRoutes.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();
connectDB();

const app = express();

// ---------- MIDDLEWARE ----------
app.use(helmet());
app.use(compression());
app.use(mongoSanitize());
app.use(hpp());
app.use(cookieParser());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ---------- HEALTH CHECK ----------
app.use('/api/health', healthRoutes);

// ---------- API ROUTES ----------
app.use('/api/countries', countryRoutes);
app.use('/api/universities', universityRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/enquiries', enquiryRoutes);

// ---------- ROOT ----------
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Study Abroad Consultancy API',
    version: '1.0.0',
  });
});

// ---------- ERROR HANDLING ----------
app.use(notFound);
app.use(errorHandler);

// ---------- START ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});