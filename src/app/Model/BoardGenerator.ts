import { IGameCell } from "./IGameCell";
import { EmptyCell } from "./EmptyCell";
import { ShipCell } from "./ShipCell";

export class BoardGenerator{
	static generateBoard(){
		var gameBoard = Array(10).fill(0).map(x => Array(10).fill(new EmptyCell())); 

		gameBoard[0][1] = new ShipCell();
		gameBoard[0][2] = new ShipCell();
		gameBoard[0][3] = new ShipCell();
		gameBoard[0][4] = new ShipCell();

		gameBoard[4][6] = new ShipCell();
		gameBoard[5][6] = new ShipCell();
		gameBoard[6][6] = new ShipCell();
		gameBoard[6][7] = new ShipCell();

		gameBoard[8][9] = new ShipCell();

		return gameBoard;	
	}
}