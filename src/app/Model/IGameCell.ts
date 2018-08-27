import { CellStatusEnum } from "./CellStatusEnum";

export interface IGameCell {
	isShipCell: Boolean;
	shoot(): void;
	status: CellStatusEnum
}