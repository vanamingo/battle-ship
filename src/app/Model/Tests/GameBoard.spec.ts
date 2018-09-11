import { Coordinate } from "../Board/Coordinate";
import { CoordinateLimits } from "../Board/CoordinateLimits";
import { TestDataFactory } from "./TestDataFactory";
import { GameBoard } from "../Board/Board";

describe('GameBoard', () => {
    let gameBoard: GameBoard;

    beforeEach(() => {
        gameBoard = TestDataFactory.getGameBoard();
        console.log('gameBoard', gameBoard);
    });

    describe('CellValidation', () => {
        it('cell with ship is not available for new ship', () => {
            expect(gameBoard.isValidShipCell(new Coordinate(0, 0))).toBeFalsy();
        });

        it('cell close to ship is not available for new ship', () => {
            expect(gameBoard.isValidShipCell(new Coordinate(1, 0))).toBeFalsy();
        });

        it('cell far from ship is available for new ship', () => {
            expect(gameBoard.isValidShipCell(new Coordinate(2, 0))).toBeTruthy();
        });

        it('cell not in x range is not available for new ship', () => {
            expect(gameBoard.isValidShipCell(new Coordinate(-2, 0))).toBeFalsy();
        });

        it('cell not in y range is not available for new ship', () => {
            expect(gameBoard.isValidShipCell(new Coordinate(0, -2))).toBeFalsy();
        });
    });

    describe('common ship statuses', () => {
        it('should not be killed inittialy', () => {
            expect(gameBoard.allShipsAreKilled()).toBeFalsy();
        })

        it('should not be killed after an empty shoot', () => {
            gameBoard.getAllHiddenCells()[0].shoot();
            expect(gameBoard.allShipsAreKilled()).toBeFalsy();
        });

        it('should not be killed after an ship shoot', () => {
            gameBoard.ships[0].cells[0].shoot();
            expect(gameBoard.allShipsAreKilled()).toBeFalsy();
        });

        it('should be killed after an all ship shoot', () => {
            gameBoard.ships.forEach(s => s.cells.forEach(c => c.shoot()));
            expect(gameBoard.allShipsAreKilled()).toBeTruthy();
        });
    });
});
