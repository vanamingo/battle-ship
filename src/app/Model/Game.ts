import { IGameCell } from "./IGameCell";
import { EmptyCell } from "./EmptyCell";
import { ShipCell } from "./ShipCell";
import { Ship } from "./Ship";

export class Game {
	constructor() {
		this.gameBoard = Array(10).fill(0).map(x => Array(10).fill(1).map(x => new EmptyCell()));

		this.addShipL();
		this.addShipI();
		this.addShipDot();

		console.log('startNewBattle gameBoard', this.gameBoard);
	}

	gameBoard: IGameCell[][]

	private addShipL() {
		let ship = new Ship(4);

		this.gameBoard[4][6] = ship.cells[0];
		this.gameBoard[5][6] = ship.cells[1];
		this.gameBoard[6][6] = ship.cells[2];
		this.gameBoard[6][7] = ship.cells[3];
	}

	private addShipI() {
		let ship = new Ship(4);

		this.gameBoard[0][1] = ship.cells[0];
		this.gameBoard[0][2] = ship.cells[1];
		this.gameBoard[0][3] = ship.cells[2];
		this.gameBoard[0][4] = ship.cells[3];
	}

	private addShipDot() {
		let ship = new Ship(1);

		this.gameBoard[7][8] = ship.cells[0];
	}
}