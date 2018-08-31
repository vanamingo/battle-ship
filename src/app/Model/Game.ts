import { IGameCell } from "./IGameCell";
import { EmptyCell } from "./EmptyCell";
import { ShipCell } from "./ShipCell";
import { Ship } from "./Ship";
import { Coordinate } from './Coordinate';
import { BorderGenerator } from "./BorderGenerator";

export class Game {
	readonly gameBoard: IGameCell[][]
	readonly borderGenerator: BorderGenerator = new BorderGenerator()

	private surroundingOffset = [
		new Coordinate(1,1),
		new Coordinate(0,1),
		new Coordinate(-1,1),
		new Coordinate(-1,0),
		new Coordinate(-1,-1),
		new Coordinate(0,-1),
		new Coordinate(1,-1),
		new Coordinate(1,0),];

	constructor() {
		this.gameBoard = this.borderGenerator.generateNewBoard();
		console.log('startNewBattle gameBoard', this.gameBoard);
	}	
}