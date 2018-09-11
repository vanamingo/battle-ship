import { Ship } from "../Board/Ship";
import { ShipCell } from "../Board/ShipCell";
import { Coordinate } from "../Board/Coordinate";

export class TestDataFactory{
    static getLShip(): Ship{
        const cells:  ShipCell[] = [
            new ShipCell(new Coordinate(0,0)),
            new ShipCell(new Coordinate(0,1)),
            new ShipCell(new Coordinate(0,2)),
            new ShipCell(new Coordinate(0,3))
        ];
        return new Ship(cells);
    }
}