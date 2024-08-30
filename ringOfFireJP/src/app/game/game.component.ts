import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  takeCardAnimation = false;
  currentCard: string = '';
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


takeCard() {
  /* nur this takeCardAnimation false ist denn wird alles aus geführt */
  if (!this.takeCardAnimation){ 
  this.currentCard = this.game.stack.pop()!;
  this.takeCardAnimation = true;

  console.log('New card:' + this.currentCard);
  console.log('Game is', this.game);

  
/* die Animation nach 1500s wiederholen */
  setTimeout(()  => {
    this.game.playedCards.push(this.currentCard);
    this.takeCardAnimation = false;
  }, 1000); 
}
}



}
