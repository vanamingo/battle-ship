import { IGameCell } from "./IGameCell";
import { EmptyCell } from "./EmptyCell";
import { ShipCell } from "./ShipCell";

export class Game{
	constructor(){	}

	gameBoard: IGameCell[][]

	startNewBattle(){		
		this.gameBoard = Array(10).fill(0).map(x => Array(10).fill(1).map(x => new EmptyCell())); 

		this.gameBoard[0][1] = new ShipCell();
		this.gameBoard[0][2] = new ShipCell();
		this.gameBoard[0][3] = new ShipCell();
		this.gameBoard[0][4] = new ShipCell();

		this.gameBoard[4][6] = new ShipCell();
		this.gameBoard[5][6] = new ShipCell();
		this.gameBoard[6][6] = new ShipCell();
		this.gameBoard[6][7] = new ShipCell();

		this.gameBoard[8][9] = new ShipCell();

		console.log('startNewBattle gameBoard', this.gameBoard);
	}
}