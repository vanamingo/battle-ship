import { IGameCell } from "./IGameCell";
import { EmptyCell } from "./EmptyCell";
import { ShipCell } from "./ShipCell";
import { Ship } from "./Ship";
import { Coordinate } from './Coordinate';
import { BorderGenerator } from "./BorderGenerator";

export class Game {
	readonly gameBoard: IGameCell[][]
	readonly borderGenerator: BorderGenerator = new BorderGenerator()

	constructor() {
		this.gameBoard = this.borderGenerator.generateNewBoard();
		console.log('startNewBattle gameBoard', this.gameBoard);
	}	
}