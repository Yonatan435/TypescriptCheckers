import { IRepository } from '../Abstraction/IRepository.js';
import { Game } from "../../Domain/Models/Game.js";
import { Generate } from "../../Utils/GuidGenerator.js";

export class InMemoryRepository implements IRepository { 
    Games : Map<string, Game>;
    constructor () 
    {
        this.Games = new Map<string, Game>();
    }
    CreateGame(creatorId: string, gameName: string)
    {
        let id: string = Generate();
        this.Games.set(gameName, new Game(id, creatorId, gameName));
    }
    GetGame(name: string)
    {
        if (this.Games.has(name))
            return this.Games.get(name);
    }
    GetAvailableGamesIds(): string[]
    {
        let availableGames: string[] = [];
        this.Games.forEach((value: Game, key: string) => {
            if (value.CanJoin)
                availableGames.push(key);
        });
        return availableGames;   
        
    }
    UpdateGame(game: Game)
    {
        this.Games.set(game.Id, game);
    }
    RemoveGame(name: string)
    {
        if (this.Games.has(name))
            this.Games.delete(name);
    }

  }