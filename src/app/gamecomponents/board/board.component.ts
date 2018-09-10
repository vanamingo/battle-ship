import { Component, OnInit, Input } from '@angular/core';
import { Game } from 'src/app/Model/Game';
import { IGameCell } from '../../Model/Board/IGameCell';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() game: Game;
  constructor() { }

  ngOnInit() {
  }


}
