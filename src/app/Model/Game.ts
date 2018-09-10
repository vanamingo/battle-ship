import { IGameCell } from './Board/IGameCell';
import { ShipCell } from './Board/ShipCell';
import { GameBoard } from './Board/Board';
import { Statistics } from './Game/Statistics';
import { getRandomInt } from './Utils/getRandomInt';
import { ShipStatusEnum } from './Board/ShipStatusEnum';

export class Game {
	gameBoard: GameBoard;

	isRobotTurn: boolean;
	isGameFinished: boolean;

	statistics: Statistics;

	constructor() {
		this.startNewGame();
	}

	startNewGame() {
		this.isRobotTurn = false;
		this.isGameFinished = false;
		this.gameBoard = new GameBoard();
		this.statistics = new Statistics();
		this.logBoard();
	}

	shoot(targetCell: IGameCell) {
		if (this.isRobotTurn || this.isGameFinished || targetCell.isOpened) {
			return;
		}

		if (this.handleShoot(targetCell)) {
			this.statistics.UserShootHit++;
			return;
		}

		this.isRobotTurn = true;
		setTimeout(() => this.robotMakesHisShoot(), 500);
	}


	finishGame(): any {
		this.isGameFinished = true;
	}
	private robotMakesHisShoot(): void {

		const targetCell = this.getTargetCellForRobot();
		if (this.handleShoot(targetCell)) {
			this.statistics.RobotShootHit++;
			setTimeout(() => this.robotMakesHisShoot(), 500);
			return;
		}

		this.isRobotTurn = false;
	}

	private getTargetCellForRobot(): IGameCell {
		const cellsAroundSomeBrokenCell = this.gameBoard.getCellsAroundFirstBrokenOpenCell();

		if (cellsAroundSomeBrokenCell) {
			const index = getRandomInt(0, cellsAroundSomeBrokenCell.length - 1);
			return cellsAroundSomeBrokenCell[index];
		}

		const hiddenCells = this.gameBoard.getAllHiddenCells();
		const hiddenCellIndex = getRandomInt(0, hiddenCells.length - 1);

		return hiddenCells[hiddenCellIndex];
	}

	private handleShoot(targetCell: IGameCell): boolean {
		targetCell.shoot();
		targetCell.isOpenedByRobot = this.isRobotTurn;
		if (targetCell instanceof ShipCell) {
			if (targetCell.ship.status === ShipStatusEnum.Killed) {
				this.gameBoard.openCellsAroundShip(targetCell.ship);
			}

			if (this.gameBoard.allShipsAreKilled()) {
				this.finishGame();
			}

			return true;
		}

		return false;
	}

	private logBoard() {
		const logBoard = this.gameBoard.gameBoard.map(row => row.map(cell => {
			return cell instanceof ShipCell ? 'X' : '';
		}).reduce(function (previousValue, currentValue, index) {

			previousValue[index] = currentValue;
			return previousValue;
		}, {})
		);

		console.table(logBoard);
	}
}
