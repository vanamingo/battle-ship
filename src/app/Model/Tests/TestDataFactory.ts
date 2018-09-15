import { Ship } from '../Board/Ship';
import { ShipCell } from '../Board/ShipCell';
import { Coordinate } from '../Board/Coordinate';
import { GameBoard } from '../Board/Board';
import { EmptyCell } from '../Board/EmptyCell';
import { IGameCell } from '../Board/IGameCell';

export class TestDataFactory {
    static getShip1(): Ship {
        const cells:  ShipCell[] = [
            new ShipCell(new Coordinate(0, 0)),
            new ShipCell(new Coordinate(0, 1)),
            new ShipCell(new Coordinate(0, 2)),
            new ShipCell(new Coordinate(0, 3))
        ];
        return new Ship(cells);
    }

    static getShip2(): Ship {
        const cells:  ShipCell[] = [
            new ShipCell(new Coordinate(5, 5))
        ];
        return new Ship(cells);
    }

    static getGameBoard(): GameBoard {
        const board = TestDataFactory.getEmptyBoard();
        const ships = [TestDataFactory.getShip1(), TestDataFactory.getShip2()];
        ships.forEach(s => TestDataFactory.placeShipToBoard(board, s));

        console.log('return new GameBoard(board, ships);');
        return new GameBoard(board, ships);
    }

    private static placeShipToBoard(board: IGameCell[][], ship: Ship ) {
        ship.cells.forEach(c => {
            board[c.coordinate.X][c.coordinate.Y] = c;
        });
    }

    private static getEmptyBoard(): IGameCell[][] {
        return Array(10)
        .fill(0)
        .map((k: number, y: number) => {
            return Array(10).fill(0).map((p: number, x: number) => {
                return new EmptyCell(new Coordinate(x, y));
            });
        });
    }
}
