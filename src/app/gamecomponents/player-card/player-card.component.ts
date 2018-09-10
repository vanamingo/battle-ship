import { Component, OnInit, Input } from '@angular/core';
import { Statistics } from '../../Model/Game/Statistics';
import { Game } from '../../Model/Game';

@Component({
  selector: '[app-player-card]',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent implements OnInit {
  @Input() statistics: Statistics;
  @Input() name: string;
  @Input() logo: string;
  @Input() statisticsField: string;
  @Input() game: Game;

  constructor() { }

  ngOnInit() {
  }

}
