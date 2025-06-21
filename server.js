import { Server } from 'socket.io';
import { createServer } from 'http';
import initSocket from './socket.js';

const PORT = process.env.PORT || 4000;

const server = createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Server is running on port ${PORT}`);
  }
});

const io = new Server(server, { 
  cors: {
    origin: true, // или можно указать конкретные домены ['http://example.com']
    methods: ['GET', 'POST'],
    credentials: true
  },
  allowEIO3: true // для совместимости с старыми клиентами
});

// Альтернативный вариант - полностью отключить CORS проверку
io.engine.on("headers", (headers, req) => {
  headers["Access-Control-Allow-Origin"] = "*"; // Разрешаем все домены
  headers["Access-Control-Allow-Methods"] = "GET,POST"; // Разрешенные методы
  headers["Access-Control-Allow-Headers"] = "Content-Type"; // Разрешенные заголовки
});

initSocket(io);

server.listen(PORT, () => { 
  console.log(`Server is running on port ${PORT}`); 
});