
import { IRequestHandler } from "./IRequestHandler.js";
import { IGameLogic } from '../Domain/Interfaces/IGameLogic.js';
export class SocketIORequestHandler implements IRequestHandler
{
    gameLogic : IGameLogic;
    
    constructor(httpServer: any, gamelogic : IGameLogic)
    {
        this.gameLogic = gamelogic;
        this.HandleRequests(httpServer);
    }
    HandleRequests(httpServer)
    {
        const io = require('socket.io')(httpServer);

        io.on('connect', socket => {
            socket.on('JoinGame', data => {
            try{
                   
                    let game = this.gameLogic.JoinGame(data['_playerId'], data['gameName']);
                    let gameName = game.Name;
                    let currentPlayerId = this.gameLogic.GetCurrentPlayerId(data['gameName']);
                    socket.emit('GameJoined', {gameName});
                    io.sockets.emit('AdvanceTurn', {currentPlayerId, gameName});
                }
                catch (error)
                {
                    console.log(error);
                    socket.emit('Error');
                }
            });
            socket.on('InitGame', data => {
                try{
                this.gameLogic.InitGame(data['_playerId'], data['gameName']);
                socket.emit('GameInitiated');
                }
                catch (error)
                {
                    console.log(error);
                    socket.emit('Error');
                }
            });
            socket.on('GetOpenGames', () => {
                try{
                let games = this.gameLogic.GetAvailableGamesIds();
                socket.emit('GetOpenGamesResult', games);
                }
                catch (error)
                {
                    console.log(error);
                    socket.emit('Error');
                }
            });
            socket.on('MakeAMove', (data) => {
            try
            {
                let pawnMoved = this.gameLogic.MovePawn(data['_playerId'], data['_gameName'], data['sourceX'], data['sourceY'], data['destinationX'], data['destinationY']);
                if (pawnMoved)
                {
                    let currentPlayerId = this.gameLogic.GetCurrentPlayerId(data['_gameName']);
                    io.sockets.emit('AdvanceTurn', {currentPlayerId});
                }
            }
            catch (error)
                {
                    console.log(error);
                    socket.emit('Error');
                }
                });
            
        });
    }
}