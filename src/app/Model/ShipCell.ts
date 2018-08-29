import { IGameCell } from "./IGameCell";
import { CellStatusEnum } from "./CellStatusEnum";
import { Ship } from "./Ship";

export class ShipCell implements IGameCell{
	isOpened: boolean = false;
	status: CellStatusEnum= CellStatusEnum.Hidden;
	ship: Ship;
	shoot(): void {
		console.log('ShipCell shoot');
		this.status = CellStatusEnum.Broken;
	}
	constructor(ship: Ship){
		this.ship = ship;
	}
}