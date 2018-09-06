import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './gamecomponents/board/board.component';
import { GameCellComponent } from './gamecomponents/game-cell/game-cell.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GameCellComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
