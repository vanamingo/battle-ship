import { TestDataFactory } from './TestDataFactory';
import { ShipStatusEnum } from '../Board/ShipStatusEnum';
import { Ship } from '../Board/Ship';
import { CellStatusEnum } from '../Board/CellStatusEnum';

describe('Ship', () => {
    let ship: Ship;

    beforeEach(() => {
        ship = TestDataFactory.getShip1();
    });

    it('has initial status OK', () => {
        expect(ship.status === ShipStatusEnum.Ok).toBeTruthy();
    });

    it('status is Broken after a shoot', () => {
        ship.cells[0].shoot();
        expect(ShipStatusEnum.Broken).toEqual(ship.status as ShipStatusEnum);
    });

    it('status is Killed after a shoot to every cell', () => {
        ship.cells.forEach(c => c.shoot());
        expect(ShipStatusEnum.Killed).toEqual(ship.status as ShipStatusEnum);
    });

    describe('Cells', () => {

        it('have initial status is Hidden', () => {
            expect(ship.cells.every(c => c.status === CellStatusEnum.Hidden)).toBeTruthy();
        });

        it('status is Broken after a shoot', () => {
            const cell = ship.cells[0];
            cell.shoot();
            expect(cell.status).toEqual(CellStatusEnum.Broken as CellStatusEnum);
        });

        it('status is Killed after a shoot to every cell', () => {
            ship.cells.forEach(c => c.shoot());
            expect(ship.cells.every(c => c.status === CellStatusEnum.Killed)).toBeTruthy();
        });

        it('is not opened initially', () => {
            const cell = ship.cells[0];
            expect(cell.isOpened).toBeFalsy();
        });

        it('is opened after a shoot', () => {
            const cell = ship.cells[0];
            cell.shoot();
            expect(cell.isOpened).toBeTruthy();
        });
    });
});
