import {Player} from './Player.js';
import {Color} from './Color';
import {Generate} from '../../Utils/GuidGenerator.js';
import { Board } from './Board.js';

export class Game
{
    Id: string;
    NumberOfPlayers : number;
    Players : Player[];
    CurrentPlayerIndex: number;
    Board : Board;
    CanJoin: boolean;
    Name: string
    constructor(gameId: string, creatorId: string, name: string)
    {
        this.Id = gameId;
        this.Board = new Board();
        this.Players = [];
        this.CurrentPlayerIndex = 0;
        this.NumberOfPlayers = 2;
        this.Players.push(new Player(creatorId, Color.White));
        this.CanJoin = true;
        this.Name = name;
    }
    public AddPlayer(playerId: string)
    {
        this.Players.push(new Player(playerId, Color.Black));
        if (this.Players.length == this.NumberOfPlayers)
            this.CanJoin = false;
    }
    
}