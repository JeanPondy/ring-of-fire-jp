import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatDialogModule, MatIconModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'], // korrigiert von styleUrl zu styleUrls
})
export class GameComponent {
  takeCardAnimation = false;
  currentCard: string = '';
  game: Game;

  constructor(private firestore: Firestore = inject(Firestore), public dialog: MatDialog) {
    this.game = new Game(); // Initialisierung des Spiels im Konstruktor
  }

  ngOnInit(): void {
    this.newGame();
    const gamesCollection = collection(this.firestore, 'games'); // Sammlung wird referenziert
    collectionData(gamesCollection ).subscribe((game) => {
      console.log('Game update', game);
    });
  }

  newGame() {
    this.game = new Game();
   
    const gamesCollection = collection(this.firestore, 'games'); // Correctly reference the 'games' collection

    addDoc(gamesCollection, this.game.toJson()) // Use addDoc to add data to Firestore
      .then(() => {
        console.log('New game document added successfully!');
      })
      .catch((error) => {
        console.error('Error adding new game document: ', error);
      });
  }

  takeCard() {
    // Nur wenn takeCardAnimation false ist, wird alles ausgeführt
    if (!this.takeCardAnimation) {
      this.currentCard = this.game.stack.pop()!;
      this.takeCardAnimation = true;

      console.log('New card: ' + this.currentCard);
      console.log('Game is', this.game);

      // Nächsten Spieler auswählen dank Modulo
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      // Die Animation nach 1000 ms wiederholen
      setTimeout(() => {
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