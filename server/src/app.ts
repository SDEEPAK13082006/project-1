import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import apiRouter from './routes';
import { errorHandler } from './middlewares/errorMiddleware';
import swaggerDocument from './docs/swagger.json';

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Swagger Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health Check Endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', message: 'DreamVerse AI Backend Running Smoothly' });
});

// Main API Router Binding
app.use('/api', apiRouter);

// Global Error Handler
app.use(errorHandler);

export default app;
