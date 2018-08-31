
export class Coordinate {
	constructor(X: number, Y: number){
		this.X = X;
		this.Y = Y;
	}
	readonly X: number
	readonly Y: number

	addCoordinates(offset: Coordinate): Coordinate{
		return new Coordinate(this.X + offset.X, this.Y + offset.Y);
	}

	isInBoardRange(): boolean{
		return 0 <= this.X && this.X <= 9 && 0 <= this.Y && this.Y <= 9;
	}
}