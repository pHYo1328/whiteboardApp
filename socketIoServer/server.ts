import express from 'express';
import { createServer } from 'http';
import setupSocketServer from './socket';

const app = express();
const httpServer = createServer(app);

setupSocketServer(httpServer);

httpServer.listen(8000, () => {
  console.log('Server listening on *:8000');
});
