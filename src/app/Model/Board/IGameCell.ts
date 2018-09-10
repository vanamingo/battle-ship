import { CellStatusEnum } from './CellStatusEnum';
import { Coordinate } from './Coordinate';

export interface IGameCell {
	status: CellStatusEnum;
	isOpened: boolean;
	coordinate: Coordinate;
	isOpenedByRobot: boolean;

	shoot(): boolean;
}
