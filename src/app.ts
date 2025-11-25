import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from '../swagger/options';
import { notFound } from './middlewares';
import pinoHttp from './middlewares/pinoHttp.middleware';
import routes from './routes';
import health from './routes/health';
import limiter from './middlewares/limiter.middlewares';
import helmet from 'helmet';
import cors, { CorsOptions } from 'cors';

const app = express();

const swaggerJsdoc = require('swagger-jsdoc');
const specs = swaggerJsdoc(swaggerOptions);

app.use(limiter);
app.use(pinoHttp);
app.use(express.json({}));
app.use(health);
app.use(helmet());
app.use(cors()); // Autorise tout le monde (origin: '*')

// const corsOptions: CorsOptions = {
//     origin: ['http://localhost:3000', 'http://mon-app.fr'],
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
// };

// app.use(cors(corsOptions));

app.use('/api/v1', routes);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(notFound);

export default app;
