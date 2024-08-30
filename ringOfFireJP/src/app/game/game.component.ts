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
  console.log(this.currentCard)
  this.takeCardAnimation = true;
 
  console.log('New card:' + this.currentCard);
  console.log('Game is', this.game);

  /* Nächsten Spieler auswählen */
  this.game.currentPlayer++;
  this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;


/* die Animation nach 1500s wiederholen */
  setTimeout(()  => {
    this.game.playedCards.push(this.currentCard);
    this.takeCardAnimation = false;
  }, 1000); // muss gleiche Zeit wie die Animation sein
}
}

}
