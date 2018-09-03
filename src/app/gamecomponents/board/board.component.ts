import { Component, OnInit } from '@angular/core';
import { ShipCell } from '../../Model/Border/ShipCell';
import { Game } from 'src/app/Model/Game';
import { IGameCell } from '../../Model/Border/IGameCell';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let game = new Game();
    this.gameBoard = game.gameBoard;
  }

  cellsRows: Number[][]

  gameBoard: IGameCell[][]
}
