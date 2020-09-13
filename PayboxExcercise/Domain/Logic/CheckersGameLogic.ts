import { IGameLogic } from '../Interfaces/IGameLogic.js';
import { IRepository } from '../../Persistence/Abstraction/IRepository.js';
import { Game } from '../Models/Game.js';

export class CheckersGameLogic implements IGameLogic {
    Repository : IRepository;
    constructor (repository : IRepository) 
    {
        this.Repository = repository;
    }
    public InitGame(creatorId: string, gameName: string)
    {
        this.Repository.CreateGame(creatorId, gameName);
        let game = this.Repository.GetGame(gameName);
    }
    public GetAvailableGamesIds(): string[]
    {
        return this.Repository.GetAvailableGamesIds();
    }
    public JoinGame(playerId : string, gameId: string) : Game
    {
        let game = this.Repository.GetGame(gameId);
        if (game.CanJoin)
        {
            game.AddPlayer(playerId);
            this.Repository.UpdateGame(game);
        }
        return game;
    }
    public GetCurrentPlayerId(gameId: string): string
    {
        let game: Game = this.Repository.GetGame(gameId);
        let currentPlayerId = game.Players[game.CurrentPlayerIndex].Id;
        return currentPlayerId;
    }
    public MovePawn(playerId: string, gameId: string, sourceX: number, sourceY: number, destinationX: number, destinationY: number): boolean 
    {
        let game = this.Repository.GetGame(gameId);
        if (this.ValidateMove(game, playerId, sourceX, sourceY, destinationX, destinationY))
        {
            let pawn =game.Board.Squares[sourceX][sourceY].Pawn;
            game.Board.Squares[sourceX][sourceY].SetPawn(null);
            game.Board.Squares[destinationX][destinationY].SetPawn(pawn);
            game.CurrentPlayerIndex = (game.CurrentPlayerIndex + 1) % game.NumberOfPlayers;
            this.Repository.UpdateGame(game);
            return true;
        }
        return false;
     
    }
    private ValidateMove(game: Game, playerId: string, sourceX: number, sourceY: number, destinationX: number, destinationY: number): boolean{
        if (game.Board.Squares[sourceX][sourceY].Pawn == null)
            return false;
        let pawnType = game.Board.Squares[sourceX][sourceY].Pawn.PawnType;
        if (destinationX >= game.Board.Squares.length ||
           (destinationY >= game.Board.Squares[0].length))
           return false;
        if (game.Board.Squares[destinationX][destinationY].Pawn != null)
            return false;
        if (game.Players[game.CurrentPlayerIndex].Id != playerId)
            return false;
        return true;
    }
  }
