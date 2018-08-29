import { IGameCell } from "./IGameCell";
import { EmptyCell } from "./EmptyCell";
import { ShipCell } from "./ShipCell";
import { Ship } from "./Ship";

export class Game {
	readonly gameBoard: IGameCell[][]

	constructor() {

		this.gameBoard = Array(10).fill(0).map(x => Array(10).fill(1).map(x => new EmptyCell()));

		this.addShipL();
		this.addShipI();
		this.addShipDot();

		console.log('startNewBattle gameBoard', this.gameBoard);
	}

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

	private insertToRandomPlace(cells: ShipCell[], offset: Array<[number, number]>) {
		while (true) {
			let startCoordinates = this.getRandomCellCoordinations();
			
			
		 }

	}

	private canCellBePlacedHere(cell: ShipCell, coordinate:[number, number]) : boolean{


		return false;
	}


	private getRandomCellCoordinations(): [number, number] {
		return [this.randomInt(), this.randomInt()];
	}
	private randomInt(): number {
		let min = 0;
		let max = 9;
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}