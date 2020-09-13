import { Pawn } from './Pawn.js';
export class Square
{
    Pawn : Pawn;
    constructor()
    {
        this.Pawn = null;
    }
    public SetPawn(pawn: Pawn)
    {
        this.Pawn = pawn;
    }
}