import { IGameCell } from "./IGameCell";
import { CellStatusEnum } from "./CellStatusEnum";
import { Coordinate } from "./Coordinate";

export class EmptyCell implements IGameCell{
	isOpenedByRobot: boolean;
	coordinate: Coordinate;
	isOpened: boolean = false;
	status: CellStatusEnum = CellStatusEnum.Hidden;
	constructor(coordinate: Coordinate){
		this.coordinate = coordinate;
	}
	shoot(): boolean {
		this.isOpened = true;
		this.status = CellStatusEnum.Missed;

		return false;
	}
}