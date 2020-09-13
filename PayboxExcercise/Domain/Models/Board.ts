
import { Square } from './Square.js';
//import { RepositoryItem } from '../Interfaces/RepositoryItem.js';
import { Pawn } from './Pawn.js';
import { Color } from './Color.js';
import { PawnType } from './PawnType.js';
export class Board
{
    Id: string;
    Squares: Square[][];
    Size: number =12;
    constructor()
    
    {
        
        this.Squares = [];
        for (let xIndex = 0; xIndex < this.Size; xIndex++) {
            this.Squares[xIndex] = [];
            for (let yIndex = 0; yIndex < this.Size; yIndex++) {
               
                let square = this.InitSquare(xIndex, yIndex);
                this.Squares[xIndex][yIndex] = square;
                
            }   
        }

    }
    private InitSquare(xIndex: number, yIndex: number) :Square
    {
        let square = new Square();
        if (xIndex == 0 && (yIndex % 2 == 0))
        {
            square.SetPawn(new Pawn(Color.White, PawnType.Normal))
        }
        else if (xIndex == this.Size-1 && (yIndex % 2 == 0))
        {
            square.SetPawn(new Pawn(Color.Black, PawnType.Normal))
        }
        return square;
    }
}
