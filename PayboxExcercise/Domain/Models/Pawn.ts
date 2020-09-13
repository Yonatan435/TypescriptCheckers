import { Color } from './Color.js';
import { PawnType } from './PawnType.js';
export class Pawn
{
    Color: Color;
    //posX: number;
    //posY: number;
    PawnType: PawnType;
    constructor(color: Color/*, posX: number, posY: number*/, pawnType: PawnType)
    {
        this.Color = color;
        //this.posX = posX;
        //this.posY = posY;
        this.PawnType = pawnType;
    }
}
