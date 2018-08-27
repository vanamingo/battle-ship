import { IGameCell } from "./IGameCell";
import { CellStatusEnum } from "./CellStatusEnum";

export class ShipCell implements IGameCell{
	status: CellStatusEnum;
	shoot(): void {
		console.log('ShipCell shoot');
		this.status = CellStatusEnum.Broken;
	}
	readonly isShipCell: Boolean = true;
	constructor(){
		this.status = CellStatusEnum.Hidden;
	}
}