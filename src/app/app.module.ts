import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './gamecomponents/board/board.component';
import { GameCellComponent } from './gamecomponents/game-cell/game-cell.component';
import { PlayerCardComponent } from './gamecomponents/player-card/player-card.component';
import { WinnerSectionComponent } from './gamecomponents/winner-section/winner-section.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GameCellComponent,
    PlayerCardComponent,
    WinnerSectionComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
