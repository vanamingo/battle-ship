import { IGameCell } from "./IGameCell";
import { CellStatusEnum } from "./CellStatusEnum";
import { Coordinate } from "./Coordinate";
import { getRandomInt } from "../Utils/getRandomInt";

export class EmptyCell implements IGameCell{
	cssNumber: number;
	coordinate: Coordinate;
	isOpened: boolean = false;
	status: CellStatusEnum = CellStatusEnum.Hidden;
	constructor(coordinate: Coordinate){
		this.coordinate = coordinate;
		this.cssNumber = getRandomInt(1,3);
	}
	shoot(): boolean {
		this.isOpened = true;
		this.status = CellStatusEnum.Missed;

		return false;
	}
}