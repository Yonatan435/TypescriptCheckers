import { Game } from "../../Domain/Models/Game.js";

 export interface IRepository {
    CreateGame(creatorId: string, gameName: string);    
    GetGame(Id : string): Game;
    GetAvailableGamesIds(): string[];
    UpdateGame(game: Game);
    RemoveGame(Id: string);


 }

