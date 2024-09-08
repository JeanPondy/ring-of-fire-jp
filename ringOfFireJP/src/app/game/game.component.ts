import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, collection, doc, collectionData, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatDialogModule, MatIconModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'], // korrigiert von styleUrl zu styleUrls
})
export class GameComponent implements OnInit {
  takeCardAnimation = false;
  currentCard: string = '';
  game: Game;

  constructor(private route: ActivatedRoute, private firestore: Firestore = inject(Firestore), public dialog: MatDialog) {
    this.game = new Game(); // Initialisierung des Spiels im Konstruktor
  }

  ngOnInit(): void {
    this.newGame();

    // Abonniert die Parameter aus der Route
    this.route.params.subscribe((params) => {
      console.log(params['id']); // Greift auf den 'id'-Parameter zu

      // Verweise auf das spezifische Dokument basierend auf der ID aus den Parametern
      const gameDocRef = doc(this.firestore, `games/${params['id']}`);

      // Hole die Daten des spezifischen Spiels und abonniere Änderungen
      docData(gameDocRef).subscribe((game:any) => {
        console.log('Game update', game);
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
      });
    });
  }

  newGame() {
    this.game = new Game();

    // Anmerkung: Der Aufruf der addDoc-Methode wurde auskommentiert, hier ist der Code unverändert
   
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
