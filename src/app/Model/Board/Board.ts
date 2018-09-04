import { IGameCell } from "./IGameCell";
import { EmptyCell } from "./EmptyCell";
import { ShipCell } from "./ShipCell";
import { Ship } from "./Ship";
import { Coordinate } from './Coordinate';
import { Offsets } from "./Offsets";
import { ShipStatusEnum } from "./ShipStatusEnum";

export class GameBoard {
	gameBoard: IGameCell[][];
	ships: Ship[] = [];

	constructor(){
		this.generateNewBoard();
	}

	allShipsAreKilled(){
		return !this.ships.some(s => s.status !== ShipStatusEnum.Killed );
	}

	private generateNewBoard(): IGameCell[][] {
		this.gameBoard = Array(10)
			.fill(0)
			.map(x => {
				let k = 0;
				return Array(10).fill(0).map(x => {
					let p = 0;
					return new EmptyCell(new Coordinate(k++, p++))
				});
			});

		this.addRandomShipL();
		this.addRandomShipL();
		this.addRandomShipI();
		this.addRandomShipDot();
		this.addRandomShipDot();
		return this.gameBoard;
	}

	private addRandomShipL() {
		//TODO: move to field. Set in constructor. 
		let offsetSet = Offsets.getShipLVariants();
		let offset = offsetSet[this.randomInt(0, 7)];

		let ship = this.generateShip(offset);
		this.ships.push(ship);
	}

	private addRandomShipDot() {
		//TODO: move to field. Set in constructor. 
		let offsetSet = Offsets.getShipDotVariants();

		let offset = offsetSet[0];
		let ship = this.generateShip(offset);
		this.ships.push(ship);
	}

	private addRandomShipI() {
		//TODO: move to field. Set in constructor. 
		let offsetSet = Offsets.getShipIVariants();

		let offset = offsetSet[this.randomInt(0, 1)];
		let ship = this.generateShip(offset);
		this.ships.push(ship);
	}

	private generateShip(offsetList: Array<Coordinate>): Ship{
		let i = 0;
		while (true) {
			i++;
			if (i === 10) {
				//TODO: handle this. 
				// For example regenerate whole board.
				return;
			}

			let startCoordinate = this.getRandomCellCoordinate();
			let shipCells = offsetList.map(o => { return new ShipCell(startCoordinate.addCoordinates(o)); });

			if (shipCells.some(c => !this.isValidShipCell(c.coordinate))) {
				//console.log('shipCoordinates are invalid', shipCoordinates);
				continue;
			}

			shipCells.forEach(cell => {
				this.gameBoard[cell.coordinate.X][cell.coordinate.Y] = cell;
			});


			return new Ship(shipCells);
		}


	}

	private insertToRandomPlace(cells: ShipCell[], offsetList: Array<Coordinate>) {
		let i = 0;
		while (true) {
			i++;
			if (i === 10) {
				//TODO: handle this. 
				// For example regenerate whole board.
				return;
			}

			let startCoordinates = this.getRandomCellCoordinate();
			//console.log('insertToRandomPlace', startCoordinates);
			let shipCoordinates = offsetList.map(o => startCoordinates.addCoordinates(o));

			if (shipCoordinates.some(c => !this.isValidShipCell(c))) {
				//console.log('shipCoordinates are invalid', shipCoordinates);
				continue;
			}

			let shipCells = cells.slice(0);

			shipCoordinates.forEach(coordinate => {
				this.gameBoard[coordinate.X][coordinate.Y] = shipCells.pop();
			});

			break;
		}
	}

	private isValidShipCell(coordinate: Coordinate): boolean {
		if (!coordinate.isInBoardRange()) {
			return false;
		}

		let surroundingCells = this.GetSurroundingCells(coordinate);
		return surroundingCells.every(c => {
			return !c || c instanceof EmptyCell;
		});
	}

	private GetSurroundingCells(coordinate: Coordinate): Array<IGameCell> {
		return Offsets.surroundingOffset
			.map(o => o.addCoordinates(coordinate))
			.map(o => {
				return o.isInBoardRange() ? this.gameBoard[o.X][o.Y] : null;
			});
	}

	private getRandomCellCoordinate(): Coordinate {
		return new Coordinate(this.randomInt(0, 9), this.randomInt(0, 9));
	}

	private randomInt(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}