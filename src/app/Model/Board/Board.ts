import { IGameCell } from './IGameCell';
import { EmptyCell } from './EmptyCell';
import { ShipCell } from './ShipCell';
import { Ship } from './Ship';
import { Coordinate } from './Coordinate';
import { Offsets } from './Offsets';
import { ShipStatusEnum } from './ShipStatusEnum';
import { getRandomInt } from '../Utils/getRandomInt';
import { CoordinateLimits } from './CoordinateLimits';

export class GameBoard {

	gameBoard: IGameCell[][];
	ships: Ship[] = [];

	constructor() {
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
			.map((k: number, y: number) => {
				return Array(10).fill(0).map((p: number,x: number) => {
					return new EmptyCell(new Coordinate(x,y));
				});
			});

		this.addRandomShipL();
		this.addRandomShipI();
		this.addRandomShipDot();
		this.addRandomShipDot();
		return this.gameBoard;
	}

	private addRandomShipL() {
		const offsetSet = Offsets.getShipLVariants();
		const offset = offsetSet[getRandomInt(0, 3)];
		const ship = this.generateShip(offset);
		this.ships.push(ship);
	}

	private addRandomShipDot() {
		const offsetSet = Offsets.getShipDotVariants();

		const offset = offsetSet[0];
		const ship = this.generateShip(offset);
		this.ships.push(ship);
	}

	private addRandomShipI() {
		const offsetSet = Offsets.getShipIVariants();

		const offset = offsetSet[getRandomInt(0, 1)];
		const ship = this.generateShip(offset);
		this.ships.push(ship);
	}

	private generateShip(offsetList: Array<Coordinate>): Ship {
		const emptyCellsInRandomOrder = this.getAllEmptyCellsInRandomOrder();

		while(true) {
			let index = getRandomInt(0, emptyCellsInRandomOrder.length - 1);
			let startCoordinate = emptyCellsInRandomOrder[index];
			emptyCellsInRandomOrder.splice(index, 1);
			
			if(!startCoordinate){
				return null;
			}

			const shipCells = offsetList.map(o => new ShipCell(startCoordinate.addCoordinates(o)));

			if (shipCells.some(c => !this.isValidShipCell(c.coordinate))) {
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

	private getAllEmptyCellsInRandomOrder(): Coordinate[] {
		return ([] as IGameCell[])
		.concat(...this.gameBoard)
		.filter(c => c instanceof EmptyCell)
		.map(c => c.coordinate)
		.sort(function(a, b){return 0.5 - Math.random()});
	}
}
