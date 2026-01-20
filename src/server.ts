import 'dotenv/config';
import { createServer, Server } from 'http';
import app from './app';
import { connectToMongo } from './db/mongo.connect';
import { setupGraphQL } from './graphql';
import { notFound } from './middlewares';

const bootstrap = async () => {
  const mongoUri: string = process.env.MONGO_URI ?? 'localhost:27017/ecommerce';
  connectToMongo(mongoUri);
  
  const server: Server = createServer(app);
  const port: number = Number(process.env.PORT) ?? 3000;
  
  await setupGraphQL(app);
  
  app.use(notFound);
  
  server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

bootstrap();