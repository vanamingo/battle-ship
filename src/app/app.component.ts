﻿import { Component } from '@angular/core';
import { Game } from './Model/Game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  game: Game
  constructor() { }

  ngOnInit() { 
    this.startGame();
  }

  startGame(){
    console.log('startGame');
    this.game = new Game();  
  }
}
