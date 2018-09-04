import { IGameCell } from "./Board/IGameCell";
import { ShipCell } from "./Board/ShipCell";
import { GameBoard } from "./Board/Board";
import { Statistics } from "./Game/Statistics";
import { getRandomInt } from "./Utils/getRandomInt";

export class Game {
	readonly gameBoard: GameBoard

	isRobotTurn: boolean = false;
	isGameFinished: boolean = false;

	statistics: Statistics;

	constructor() {
		this.gameBoard =new GameBoard();;
		this.statistics = new Statistics(); 
		this.logBoard();
	}

	shoot(targetCell: IGameCell) {
		if (this.isRobotTurn || this.isGameFinished || targetCell.isOpened) {
			return;
		}

		targetCell.shoot();
		if (targetCell instanceof ShipCell) {
			this.statistics.UserShootHit++;

			if(this.gameBoard.allShipsAreKilled()){
				this.finishGame();
			}

			return;
		}

		this.isRobotTurn = true;
		setTimeout(() => this.robotMakesHisShoot(), 500);


	}
	finishGame(): any {
		throw new Error("Method not implemented.");
	}
	robotMakesHisShoot(): void {
		let hiddenCells = this.gameBoard.getAllHiddenCells();
		let hiddenCellIndex = getRandomInt(0, hiddenCells.length - 1);

		hiddenCells[hiddenCellIndex].shoot();

		this.isRobotTurn = false;
	}

	/*private openAllCellsAround(targetShip: Ship): void {
		let cells = targetShip
			.cells
			.map(c =>
				Offsets.surroundingOffset.map(o => o.addCoordinates(c))
			)
			.reduce((acc, item) => {
				acc.concat(item);
				return acc;
			}, [])
			.filter(c => { return c.isInBoardRange() && c instanceof EmptyCell })
			.forEach(c => c.)

		Offsets.surroundingOffset

	}*/


	private logBoard() {
		let logBoard = this.gameBoard.gameBoard.map(row => row.map(cell => {
			return cell instanceof ShipCell ? 'X' : '';
		}).reduce(function (previousValue, currentValue, index) {

			previousValue[index] = currentValue;
			return previousValue;
		}, {})
		);

		console.table(logBoard);
	}
}