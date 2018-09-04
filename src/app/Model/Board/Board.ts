import { IGameCell } from "./IGameCell";
import { EmptyCell } from "./EmptyCell";
import { ShipCell } from "./ShipCell";
import { Ship } from "./Ship";
import { Coordinate } from './Coordinate';
import { Offsets } from "./Offsets";
import { ShipStatusEnum } from "./ShipStatusEnum";
import { getRandomInt } from "../Utils/getRandomInt";

export class GameBoard {
	gameBoard: IGameCell[][];
	ships: Ship[] = [];

	constructor(){
		this.generateNewBoard();
	}

	allShipsAreKilled(){
		return !this.ships.some(s => s.status !== ShipStatusEnum.Killed );
	}

	getAllHiddenCells(){
		return ([] as IGameCell[]).concat(...this.gameBoard).filter(c => !c.isOpened);
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
		let offset = offsetSet[getRandomInt(0, 7)];

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

		let offset = offsetSet[getRandomInt(0, 1)];
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
		return new Coordinate(getRandomInt(0, 9), getRandomInt(0, 9));
	}
}