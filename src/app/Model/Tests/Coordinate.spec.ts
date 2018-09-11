import { Coordinate } from "../Board/Coordinate";
import { CoordinateLimits } from "../Board/CoordinateLimits";

describe('Coordinate', () => {
    let coordinate1: Coordinate;

    beforeEach(() => {
        coordinate1 = new Coordinate(0,0);
    });

    it('should be isInBoardRange equals true in 0,0', () => {
        let c = new Coordinate(0,0);
        expect(c.isInBoardRange()).toBeTruthy();
    });

    it('should be isInBoardRange equals true in XMax,YMax', () => {
        let c = new Coordinate(CoordinateLimits.XMax,CoordinateLimits.YMax);
        expect(c.isInBoardRange()).toBeTruthy();
    });

    it('should be isInBoardRange equals false in -1,0', () => {
        let c = new Coordinate(-1,0);
        expect(c.isInBoardRange()).toBeFalsy();
    });

    it('should be isInBoardRange equals false in 0,-1', () => {
        let c = new Coordinate(0,-1);
        expect(c.isInBoardRange()).toBeFalsy();
    });

    it('should be isInBoardRange equals false in -1,-1', () => {
        let c = new Coordinate(-1, -1);
        expect(c.isInBoardRange()).toBeFalsy();
    });

    it('should be isInBoardRange equals false in XMax + 1,YMax', () => {
        let c = new Coordinate(CoordinateLimits.XMax +1 ,CoordinateLimits.YMax);
        expect(c.isInBoardRange()).toBeFalsy();
    });

    it('should be isInBoardRange equals false in XMax,YMax + 1', () => {
        let c = new Coordinate(CoordinateLimits.XMax +1 ,CoordinateLimits.YMax);
        expect(c.isInBoardRange()).toBeFalsy();
    });

    it('should be isInBoardRange equals false in XMax + 1,YMax + 1', () => {
        let c = new Coordinate(CoordinateLimits.XMax +1 ,CoordinateLimits.YMax + 1);
        expect(c.isInBoardRange()).toBeFalsy();
    });

    it('should be reversed', () => {
        let c = new Coordinate(1,5);
        let reversedC = c.reverse();

        expect(5).toEqual(reversedC.X);
        expect(1).toEqual(reversedC.Y);
    });

    it('should be added', () => {
        let c1 = new Coordinate(3,5);
        let offset = new Coordinate(1,1);
        let c3 = c1.addCoordinates(offset);

        expect(4).toEqual(c3.X);
        expect(6).toEqual(c3.Y);
    });



});
