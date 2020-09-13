import { IRepository } from './Persistence/Abstraction/IRepository.js';
import { InMemoryRepository } from './Persistence/Logic/InMemoryRepository.js';
import { CheckersGameLogic } from './Domain/Logic/CheckersGameLogic.js';
import { IGameLogic } from './Domain/Interfaces/IGameLogic.js';
import { IRequestHandler } from './ServiceLayer/IRequestHandler.js';
import { SocketIORequestHandler } from './ServiceLayer/SocketIORequestHandler.js';

const httpServer = require('http').createServer((req, res) => {
   res.setHeader('Content-Type', 'text/html');
   res.end();
 });

var repository: IRepository = new InMemoryRepository();
var gameLogic: IGameLogic = new CheckersGameLogic(repository);
var requestHandler: IRequestHandler = new SocketIORequestHandler(httpServer, gameLogic);

httpServer.listen(3000, () => {
  console.log('go to http://localhost:3000');
});


