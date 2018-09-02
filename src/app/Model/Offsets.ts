import { Coordinate } from "./Coordinate";

export class Offsets {
	shipLVariants = this.getShipLVariants()


	surroundingOffset = [
		new Coordinate(1, 1),
		new Coordinate(0, 1),
		new Coordinate(-1, 1),
		new Coordinate(-1, 0),
		new Coordinate(-1, -1),
		new Coordinate(0, -1),
		new Coordinate(1, -1),
		new Coordinate(1, 0),];

	private gameBoard: IGameCell[][];

	generateNewBoard(): IGameCell[][] {
		this.gameBoard = Array(10).fill(0).map(x => Array(10).fill(null).map(x => new EmptyCell()));

		this.addRandomShipL();
		return this.gameBoard;
	}

	private getShipLVariants(): Array<Coordinate>{
		let v1: Array<Coordinate> = [
			new Coordinate(0, 0),
			new Coordinate(-1, 0),
			new Coordinate(-1, 1),
			new Coordinate(-1, 2)];
		
			let v2 = v1.map();

		return new Array<Coordinate>();
	}


	private addRandomShipL() {
		let ship = new Ship(4);
		let offset: Array<Coordinate> = [
			new Coordinate(0, 0),
			new Coordinate(-1, 0),
			new Coordinate(-1, 1),
			new Coordinate(-1, 2)];
		this.insertToRandomPlace(ship.cells, offset);
	}

	private insertToRandomPlace(cells: ShipCell[], offsetList: Array<Coordinate>) {
		let i = 0;
		while (true) {
			i++;
			if (i === 10) {
				return;
			}

			let startCoordinates = this.getRandomCellCoordinate();
			console.log('insertToRandomPlace', startCoordinates);
			let shipCoordinates = offsetList.map(o => startCoordinates.addCoordinates(o));

			if (shipCoordinates.some(c => !this.isValidShipCell(c))) {
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
		return this.surroundingOffset
			.map(o => o.addCoordinates(coordinate))
			.map(o => {
				return o.isInBoardRange() ? this.gameBoard[o.X][o.Y] : null;
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