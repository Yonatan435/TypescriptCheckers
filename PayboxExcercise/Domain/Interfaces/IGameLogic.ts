import { Game } from '../Models/Game.js';


 export interface IGameLogic {  
   InitGame(creatorId: string, gameName: string);  
   GetAvailableGamesIds(): string[]
   JoinGame(playerId : string, gameId: string): Game;
   MovePawn(playerId: string, gameId: string, sourceX: number, sourceY: number, destinationX: number, destinationY: number): boolean;
  GetCurrentPlayerId(gameId: string): string;
 }

