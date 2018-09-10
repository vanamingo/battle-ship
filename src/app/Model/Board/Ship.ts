import { ShipCell } from './ShipCell';
import { ShipStatusEnum } from './ShipStatusEnum';
import { CellStatusEnum } from './CellStatusEnum';

export class Ship {
    readonly cells: ShipCell[];
    status: ShipStatusEnum = ShipStatusEnum.Ok;

    constructor(shipCells: ShipCell[]) {
        this.cells = shipCells;
        this.cells.forEach(c => c.ship = this);
    }

    catchShoot(cell: ShipCell) {
        cell.status  = CellStatusEnum.Broken;
        this.recalcStatus();
    }

    private recalcStatus() {
        if (this.cells.every(c => c.isOpened)) {
            this.status = ShipStatusEnum.Killed;

            this.cells.forEach(c => {c.status = CellStatusEnum.Killed; });
            return;
        }

        if (this.cells.some(c => c.isOpened)) {
            this.status = ShipStatusEnum.Broken;
            return;
        }

        this.status = ShipStatusEnum.Ok;
    }
}
