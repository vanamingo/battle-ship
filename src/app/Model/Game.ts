import { IGameCell } from "./Border/IGameCell";
import { ShipCell } from "./Border/ShipCell";
import { GameBoard } from "./Border/BorderGenerator";
import { Statistics } from "./Game/Statistics";

export class Game {
	readonly gameBoard: GameBoard
	//readonly borderGenerator: Board = new Board()

	isRobotTurn: boolean = false;
	isFinished: boolean = false;

	statistics: Statistics;

	constructor() {
		this.gameBoard =new GameBoard();;
		this.statistics = new Statistics(); 
		this.logBoard();
	}

	shoot(targetCell: IGameCell) {
		if (this.isRobotTurn || this.isFinished) {
			return;
		}

		if (targetCell.isOpened) {
			return;
		}

		let isShip = targetCell.shoot();

		if (isShip) {
			/*if (shipCell.ship.status === ShipStatusEnum.Killed) {
				this.openAllCellsAround(shipCell.ship);
			}*/

			this.statistics.UserShootHit++;

			if(this.gameBoard.allShipsAreKilled()){
				this.finishGame();
			}

			return;
		}

		this.isRobotTurn = true;
		this.robotMakesHisShoot();


	}
	finishGame(): any {
		throw new Error("Method not implemented.");
	}
	robotMakesHisShoot(): void {


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