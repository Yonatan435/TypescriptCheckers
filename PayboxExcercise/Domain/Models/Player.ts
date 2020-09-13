import {Color} from './Color.js';
import {Generate} from '../../Utils/GuidGenerator.js';
export class Player
{
    Id: string;
    Color: Color;
    constructor(id: string, color : Color)
    {
        this.Id = id;
        this.Color = color;
    }
}