import { Coordinate } from './Coordinate';


export class Offsets {

	static surroundingOffset = [
		new Coordinate(1, 1),
		new Coordinate(0, 1),
		new Coordinate(-1, 1),
		new Coordinate(-1, 0),
		new Coordinate(-1, -1),
		new Coordinate(0, -1),
		new Coordinate(1, -1),
		new Coordinate(1, 0)];



	 static getShipDotVariants(): Coordinate[][] {
		const v1: Array<Coordinate> = [
			new Coordinate(0, 0)];
		return  [] = [v1];
	 }

	 static getShipIVariants(): Coordinate[][] {
		const v1: Array<Coordinate> = [
			new Coordinate(0, 0),
			new Coordinate(-1, 0),
			new Coordinate(-2, 0),
			new Coordinate(-3, 0)];

		const v2 =  v1.map(c => c.reverse());
		return  [] = [v1, v2, ];
	 }

	 static getShipLVariants(): Coordinate[][] {

		// HORISONTAL L SHIPS
		const v1: Array<Coordinate> = [
			new Coordinate(0, 0),
			new Coordinate(-1, 0),
			new Coordinate(-1, 1),
			new Coordinate(-1, 2)];

		const v2: Array<Coordinate> = v1.map(c => c.multiply(-1, 1));
		const v3: Array<Coordinate> = v1.map(c => c.multiply(1, -1));
		const v4: Array<Coordinate> = v1.map(c => c.multiply(-1, -1));

		const v5 = v1.map(c => c.reverse());
		const v6 = v2.map(c => c.reverse());
		const v7 = v3.map(c => c.reverse());
		const v8 = v4.map(c => c.reverse());

		return  [] = [v1, v2, v3, v4, v5, v6, v7, v8];
	}
}
