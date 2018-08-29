﻿import { IGameCell } from "./IGameCell";
import { CellStatusEnum } from "./CellStatusEnum";

export class EmptyCell implements IGameCell{
	isOpened: boolean = false;
	status: CellStatusEnum = CellStatusEnum.Hidden;
	constructor(){}
	shoot(): void {
		this.isOpened = true;
		this.status = CellStatusEnum.Missed;
	}
}