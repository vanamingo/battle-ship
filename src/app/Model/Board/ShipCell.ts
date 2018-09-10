import { IGameCell } from './IGameCell';
import { CellStatusEnum } from './CellStatusEnum';
import { Ship } from './Ship';
import { Coordinate } from './Coordinate';

export class ShipCell implements IGameCell {
	isOpenedByRobot: boolean;
	isOpened = false;
	status: CellStatusEnum = CellStatusEnum.Hidden;
	ship: Ship;
	coordinate: Coordinate;
	shoot(): boolean {
		//console.log('ShipCell shoot');
		this.isOpened = true;
		this.ship.catchShoot(this);

		return true;
	}
	constructor(coordinate: Coordinate) {
		this.coordinate = coordinate;
	}
}
