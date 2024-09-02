import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import {  GameInfoComponent } from '../game-info/game-info.component';



@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatDialogModule, MatIconModule, GameInfoComponent ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {
  takeCardAnimation = false;
  currentCard: string = '';
  game: Game;


constructor(public dialog: MatDialog){
  
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


 
    /* Nächsten Spieler auswählen Dank Modulo*/
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
  
/* die Animation nach 1500s wiederholen */
  setTimeout(()  => {
    this.game.playedCards.push(this.currentCard);
    this.takeCardAnimation = false;
  }, 1000); 
}
}

openDialog() {
  const dialogRef = this.dialog.open(DialogAddPlayerComponent);

  dialogRef.afterClosed().subscribe((name: string) => {
    if (name && name.length > 0) {
      this.game.players.push(name);
    }

  });
}
}



