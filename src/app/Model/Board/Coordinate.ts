
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

	multiply(X: number, Y: number): Coordinate{
		let newX = X === null ? this.X : this.X * X; 
		let newY = Y === null ? this.Y : this.Y * Y; 
		return new Coordinate(newX, newY);
	}

	isInBoardRange(): boolean{
		return 0 <= this.X && this.X <= 9 && 0 <= this.Y && this.Y <= 9;
	}

	reverse(): Coordinate{
		return new Coordinate(this.Y, this.X);
	}
}