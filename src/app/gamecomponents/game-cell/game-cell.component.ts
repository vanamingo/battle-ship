import { Component, OnInit, Input } from '@angular/core';
import { IGameCell } from '../../Model/Board/IGameCell';
import { getRandomInt } from '../../Model/Utils/getRandomInt';
import { CellStatusEnum } from '../../Model/Board/CellStatusEnum';
import { Game } from '../../Model/Game';

@Component({
  selector: '[app-game-cell]',
  templateUrl: './game-cell.component.html',
  styleUrls: ['./game-cell.component.css']
})
export class GameCellComponent implements OnInit {

  @Input() cell: IGameCell;
  @Input() game: Game;

  cssNumber: number;

  shoot(targetCell: IGameCell) {
    this.game.shoot(targetCell);
  }

  getIconType(): string {
    const status = this.cell.status;
    if (status === CellStatusEnum.Broken || status === CellStatusEnum.Killed ) {
      return 'cross';
    }

    return status;
  }

  isRobot(): boolean {
    return this.cell.isOpenedByRobot;
  }

  constructor() {
    this.cssNumber = getRandomInt(1, 3);
  }

  ngOnInit() {
  }
}
