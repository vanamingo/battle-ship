import { IGameCell } from "./Board/IGameCell";
import { ShipCell } from "./Board/ShipCell";
import { GameBoard } from "./Board/Board";
import { Statistics } from "./Game/Statistics";
import { getRandomInt } from "./Utils/getRandomInt";
import { ShipStatusEnum } from "./Board/ShipStatusEnum";

export class Game {
	readonly gameBoard: GameBoard

	isRobotTurn: boolean = false;
	isGameFinished: boolean = false;

	statistics: Statistics;

	constructor() {
		this.gameBoard =new GameBoard();
		this.statistics = new Statistics(); 
		this.logBoard();
	}

	shoot(targetCell: IGameCell) {
		if (this.isRobotTurn || this.isGameFinished || targetCell.isOpened) {
			return;
		}

		if(this.handleShoot(targetCell)){
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

		let targetCell = this.getTargetCellForRobot();
		if(this.handleShoot(targetCell)){
			this.statistics.UserShootHit++;
			setTimeout(() => this.robotMakesHisShoot(), 500);
		}

		this.isRobotTurn = false;
	}

	private getTargetCellForRobot(): IGameCell{
		let cellsAroundSomeBrokenCell = this.gameBoard.getCellsAroundFirstBrokenOpenCell();

		if(cellsAroundSomeBrokenCell){
			let index = getRandomInt(0, cellsAroundSomeBrokenCell.length - 1);
			return cellsAroundSomeBrokenCell[index];
		}

		let hiddenCells = this.gameBoard.getAllHiddenCells();
		let hiddenCellIndex = getRandomInt(0, hiddenCells.length - 1);

		return hiddenCells[hiddenCellIndex];
	}

	private handleShoot(targetCell: IGameCell): boolean{
		targetCell.shoot();		
		targetCell.isOpenedByRobot = this.isRobotTurn;
		console.log('targetCell.isOpenedByRobot = this.isRobotTurn;',targetCell.isOpenedByRobot );
		if (targetCell instanceof ShipCell) {	
			if(targetCell.ship.status === ShipStatusEnum.Killed){
				this.gameBoard.openCellsAroundShip(targetCell.ship);
			}

			if(this.gameBoard.allShipsAreKilled()){
				this.finishGame();
			}

			return true;
		}

		return false;
	}

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