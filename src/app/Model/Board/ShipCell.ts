﻿import { IGameCell } from "./IGameCell";
import { CellStatusEnum } from "./CellStatusEnum";
import { Ship } from "./Ship";
import { Coordinate } from "./Coordinate";
import { getRandomInt } from "../Utils/getRandomInt";

export class ShipCell implements IGameCell{
	cssNumber: number;
	isOpened: boolean = false;
	status: CellStatusEnum= CellStatusEnum.Hidden;
	ship: Ship;
	coordinate: Coordinate;
	shoot(): boolean {
		console.log('ShipCell shoot');
		this.isOpened = true;
		this.ship.catchShoot(this);

		return true;
	}
	constructor(coordinate: Coordinate){
		this.coordinate = coordinate;
		this.cssNumber = getRandomInt(1,3);
	}
}