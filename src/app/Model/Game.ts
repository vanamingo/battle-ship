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
		this.logBoard();
	}	


	private logBoard(){
		let logBoard = this.gameBoard.map(row => row.map(cell => { 
			return cell instanceof ShipCell ? 'X' : ''; 
		}).reduce(function(previousValue, currentValue, index) {
	
			previousValue[index] = currentValue;
		 return previousValue;
		 }, {})
	);




		console.table( logBoard);

	}
}