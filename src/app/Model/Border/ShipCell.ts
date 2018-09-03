﻿import { IGameCell } from "./IGameCell";
import { CellStatusEnum } from "./CellStatusEnum";
import { Ship } from "./Ship";
import { Coordinate } from "./Coordinate";

export class ShipCell implements IGameCell{
	isOpened: boolean = false;
	status: CellStatusEnum= CellStatusEnum.Hidden;
	ship: Ship;
	shoot(): boolean {
		console.log('ShipCell shoot');
		this.isOpened = true;
		this.ship.catchShoot(this);

		return true;
	}
	constructor(ship: Ship){
		this.ship = ship;
	}
}