import { IGameCell } from "./IGameCell";
import { EmptyCell } from "./EmptyCell";
import { ShipCell } from "./ShipCell";
import { Ship } from "./Ship";
import { Coordinate } from './Coordinate';

export class Game {
	readonly gameBoard: IGameCell[][]
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

		this.gameBoard = Array(10).fill(0).map(x => Array(10).fill(1).map(x => new EmptyCell()));

		this.addShipL();
		this.addShipI();
		this.addShipDot();
		//console.log('startNewBattle gameBoard1', this.gameBoard);

		this.addRandomShipL();

		console.log('startNewBattle gameBoard', this.gameBoard);
	}

	private addShipL() {
		let ship = new Ship(4);

		this.gameBoard[4][6] = ship.cells[0];
		this.gameBoard[5][6] = ship.cells[1];
		this.gameBoard[6][6] = ship.cells[2];
		this.gameBoard[6][7] = ship.cells[3];
	}

	private addRandomShipL() {
		let ship = new Ship(4);
		let offset: Array<Coordinate> = [
			new Coordinate(0,0),
			new Coordinate(-1,0),
			new Coordinate(-1,1),
			new Coordinate(-1,2)];
		this.insertToRandomPlace(ship.cells, offset);
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

	private insertToRandomPlace(cells: ShipCell[], offsetList: Array<Coordinate>) {
		let i = 0;
		while (true) {
			i++;
			if(i === 10){
				return;
			}
			
			let startCoordinates = this.getRandomCellCoordinate();
			console.log('insertToRandomPlace', startCoordinates );
			let shipCoordinates = offsetList.map( o => startCoordinates.addCoordinates(o));

			if(shipCoordinates.some(c => !this.isValidShipCell(c))){
				console.log('shipCoordinates are invalid', shipCoordinates);
				continue;
			}

			let shipCells = cells.slice(0);

			shipCoordinates.forEach(coordinate => {
				this.gameBoard[coordinate.X][coordinate.Y] = shipCells.pop();				
			});	

			break;	
		 }
	}

	private isValidShipCell(coordinate: Coordinate) : boolean{
		if(!coordinate.isInBoardRange()){
			return false;
		}

		let surroundingCells = this.GetSurroundingCells(coordinate);
		return surroundingCells.every(c => {
			return !c || c instanceof EmptyCell;
		});
	}

	private GetSurroundingCells(coordinate: Coordinate): Array<IGameCell>{
		return this.surroundingOffset
		.map(o => o.addCoordinates(coordinate))
		.map(o => { 
			return o.isInBoardRange()? this.gameBoard[o.X][o.Y] : null;		
		});	
	}

	private getRandomCellCoordinate(): Coordinate {
		return new Coordinate(this.randomInt(), this.randomInt());
	}

	private randomInt(): number {
		let min = 0;
		let max = 9;
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}