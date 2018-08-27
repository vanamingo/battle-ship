import { Component, OnInit } from '@angular/core';
import { ShipCell } from 'src/app/Model/ShipCell';
import { BoardGenerator } from 'src/app/Model/BoardGenerator';
import { IGameCell } from '../../Model/IGameCell';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
	 // this.cellsRows = [[1, 2, 3], [4, 5, 6]];
   // console.log(this.cellsRows);
   // let c = new ShipCell();


    this.gameBoard = BoardGenerator.generateBoard();
  }

  cellsRows: Number[][]

  gameBoard: IGameCell[][]
}
