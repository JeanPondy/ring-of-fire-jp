import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  takeCardAnimation = false;
  game: Game;


constructor(){
  this.game = new Game(); // Initialisierung des Spiels im Konstruktor
}

ngOnInit(): void{
  this.newGame()
}
newGame(){
this.game = new Game();
console.log(this.game)
}


takeCard(){
  this.takeCardAnimation = true;
}




  
}
