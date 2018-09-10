import { IGameCell } from './IGameCell';
import { EmptyCell } from './EmptyCell';
import { ShipCell } from './ShipCell';
import { Ship } from './Ship';
import { Coordinate } from './Coordinate';
import { Offsets } from './Offsets';
import { ShipStatusEnum } from './ShipStatusEnum';
import { getRandomInt } from '../Utils/getRandomInt';

export class GameBoard {
	gameBoard: IGameCell[][];
	ships: Ship[] = [];

	constructor() {
		/*
		It is a rare case when the board generation algorith can't find a place for some ship.
		Regenerate the board in this case.
		*/

		do {
			this.generateNewBoard();
		}
		while (this.ships.some(s => !s));
	}

	allShipsAreKilled() {
		return !this.ships.some(s => s.status !== ShipStatusEnum.Killed);
	}

	getAllHiddenCells() {
		return ([] as IGameCell[]).concat(...this.gameBoard).filter(c => !c.isOpened);
	}

	getCellsAroundFirstBrokenOpenCell(): IGameCell[] {
		//console.log('getCellsAroundFirstBrokenOpenCell ships = ', this.ships);
		const brokenShip = this.ships.find(s => s.status === ShipStatusEnum.Broken);

		if (brokenShip) {
			const brokenCells = brokenShip.cells.filter(c => c.isOpened);
			return this.getSurroundingCellsForArray(brokenCells)
				.filter(c => !c.isOpened);
		}

		return null;
	}

	getSurroundingCellsForArray(cells: IGameCell[]): IGameCell[] {
		const arr = cells.map(c => this.GetSurroundingCells(c.coordinate));
		return ([] as IGameCell[]).concat(...arr);
	}


	openCellsAroundShip(ship: Ship) {
		const arr = this.getSurroundingCellsForArray(ship.cells)
			.filter(c => c && !c.isOpened && c instanceof EmptyCell)
			.forEach(c => c.shoot());

	}

	private generateNewBoard(): IGameCell[][] {
		this.ships = [];
		this.gameBoard = Array(10)
			.fill(0)
			.map(x => {
				let k = 0;
				return Array(10).fill(0).map(x => {
					let p = 0;
					return new EmptyCell(new Coordinate(k++, p++));
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
		const offsetSet = Offsets.getShipLVariants();
		const offset = offsetSet[getRandomInt(0, 7)];

		const ship = this.generateShip(offset);
		this.ships.push(ship);
	}

	private addRandomShipDot() {
		//TODO: move to field. Set in constructor.
		const offsetSet = Offsets.getShipDotVariants();

		const offset = offsetSet[0];
		const ship = this.generateShip(offset);
		this.ships.push(ship);
	}

	private addRandomShipI() {
		//TODO: move to field. Set in constructor.
		const offsetSet = Offsets.getShipIVariants();

		const offset = offsetSet[getRandomInt(0, 1)];
		const ship = this.generateShip(offset);
		this.ships.push(ship);
	}

	private generateShip(offsetList: Array<Coordinate>): Ship {
		let i = 0;
		while (true) {
			i++;
			if (i === 10) {
				//console.log('Can\'t find a place for a ship');
				//TODO: handle this.
				// For example regenerate whole board.
				return;
			}

			const startCoordinate = this.getRandomCellCoordinate();
			const shipCells = offsetList.map(o => new ShipCell(startCoordinate.addCoordinates(o)));

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

	private isValidShipCell(coordinate: Coordinate): boolean {
		if (!coordinate.isInBoardRange()) {
			return false;
		}

		const surroundingCells = this.GetSurroundingCells(coordinate);
		return surroundingCells.every(c => {
			return !c || c instanceof EmptyCell;
		});
	}

	private GetSurroundingCells(coordinate: Coordinate): Array<IGameCell> {
		return Offsets.surroundingOffset
			.map(o => o.addCoordinates(coordinate))
			.map(o => {
				return o.isInBoardRange() ? this.gameBoard[o.X][o.Y] : null;
			})
			.filter(c => c);
	}

	private getRandomCellCoordinate(): Coordinate {
		return new Coordinate(getRandomInt(0, 9), getRandomInt(0, 9));
	}
}
