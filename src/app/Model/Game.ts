import { IGameCell } from "./Border/IGameCell";
import { EmptyCell } from "./Border/EmptyCell";
import { ShipCell } from "./Border/ShipCell";
import { Ship } from "./Border/Ship";
import { Coordinate } from './Border/Coordinate';
import { BorderGenerator } from "./Border/BorderGenerator";

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