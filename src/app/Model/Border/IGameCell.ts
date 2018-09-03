import { CellStatusEnum } from "./CellStatusEnum";
import { Coordinate } from "./Coordinate";

export interface IGameCell {
	shoot(): boolean;
	status: CellStatusEnum;
	isOpened: boolean;
}