import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './gamecomponents/board/board.component';
import { GameCellComponent } from './gamecomponents/game-cell/game-cell.component';
import { PlayerCardComponent } from './gamecomponents/player-card/player-card.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GameCellComponent,
    PlayerCardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
