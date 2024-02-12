import { Server as HttpServer } from 'http';
import { Server as HttpsServer } from 'https';
import { Server as SocketIOServer } from 'socket.io';
import registerEventHandlers from './events';

// This type accepts both HTTP and HTTPS servers
type ServerType = HttpServer | HttpsServer;

function setupSocketServer(httpServer: ServerType): void {
  const io = new SocketIOServer(httpServer, {
    cors: { origin: "*" },
  });

  io.on('connection', (socket) => {
    registerEventHandlers(socket);
  });
}

export default setupSocketServer;
