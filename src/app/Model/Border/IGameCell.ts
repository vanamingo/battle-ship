import { CellStatusEnum } from "./CellStatusEnum";

export interface IGameCell {
	shoot(): void;
	status: CellStatusEnum;
	isOpened: boolean;
}