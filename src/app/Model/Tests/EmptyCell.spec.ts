import { EmptyCell } from '../Board/EmptyCell';
import { Coordinate } from '../Board/Coordinate';
import { CellStatusEnum } from '../Board/CellStatusEnum';

describe('EmptyCell', () => {
    let cell: EmptyCell;

    beforeEach(() => {
        cell = new EmptyCell(new Coordinate(0, 0));
    });

    it('has initial status Hidden', () => {
        expect(cell.status).toEqual(CellStatusEnum.Hidden as CellStatusEnum);
    });

    it('has status Missed after a shoot', () => {
        cell.shoot();
        expect(cell.status).toEqual(CellStatusEnum.Missed as CellStatusEnum);
    });

    it('is not opened initially', () => {
        expect(cell.isOpened).toBeFalsy();
    });

    it('is opened after a shoot', () => {
        cell.shoot();
        expect(cell.isOpened).toBeTruthy();
    });
});
