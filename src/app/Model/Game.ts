import { IGameCell } from "./Border/IGameCell";
import { ShipCell } from "./Border/ShipCell";
import { BorderGenerator } from "./Border/BorderGenerator";
import { Statistics } from "./Game/Statistics";

export class Game {
	readonly gameBoard: IGameCell[][]
	readonly borderGenerator: BorderGenerator = new BorderGenerator()

	isRobotTurn: boolean = false;
	statistics: Statistics;

	constructor() {
		this.gameBoard = this.borderGenerator.generateNewBoard();
		this.statistics = new Statistics(); 
		this.logBoard();
	}

	shoot(targetCell: IGameCell) {
		if (this.isRobotTurn) {
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
			return;
		}

		this.isRobotTurn = true;
		this.robotMakesHisShoot();


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
		let logBoard = this.gameBoard.map(row => row.map(cell => {
			return cell instanceof ShipCell ? 'X' : '';
		}).reduce(function (previousValue, currentValue, index) {

			previousValue[index] = currentValue;
			return previousValue;
		}, {})
		);

		console.table(logBoard);
	}
}