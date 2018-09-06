import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/Model/Game';
import { IGameCell } from '../../Model/Board/IGameCell';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.game = new Game();
  }

  game: Game
}
