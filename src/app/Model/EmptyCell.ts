import { IGameCell } from "./IGameCell";
import { CellStatusEnum } from "./CellStatusEnum";

export class EmptyCell implements IGameCell{
	status: CellStatusEnum;
	constructor(){
		console.log('EmptyCell shoot');
		this.status = CellStatusEnum.Hidden;
	}
	shoot(): void {
		this.status = CellStatusEnum.Missed;
	}
	readonly isShipCell: Boolean = false;
}