import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../../Model/Game';

@Component({
  selector: 'app-winner-section',
  templateUrl: './winner-section.component.html',
  styleUrls: ['./winner-section.component.css']
})
export class WinnerSectionComponent implements OnInit {
  @Input() game: Game;
  @Input() restartHandler;
  constructor() { }

  isGameFinished(): boolean {
    return this.game.isGameFinished;
  }

  whoIsTheWinner() {
    const stat = this.game.statistics;
    if (stat.RobotShootHit > stat.UserShootHit) {
      return 'robot';
    }

    if (stat.RobotShootHit < stat.UserShootHit) {
      return 'user';
    }

    return 'friendship';
  }

  restartGame() {
    this.game.startNewGame();
  }

  ngOnInit() {
  }

}
