import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { PlayerMobileComponent } from '../player-mobile/player-mobile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { Firestore, collection, doc, collectionData, docData, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, PlayerMobileComponent, MatButtonModule, MatDialogModule, MatIconModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'], // korrigiert von styleUrl zu styleUrls
})
export class GameComponent implements OnInit {
 
  game: Game;
  gameId!: string;
  gameOver = false;

  constructor(private route: ActivatedRoute, private firestore: Firestore = inject(Firestore), public dialog: MatDialog) {
    this.game = new Game(); // Initialisierung des Spiels im Konstruktor
  }

  ngOnInit(): void {
    this.newGame();

    // Abonniert die Parameter aus der Route
    this.route.params.subscribe((params) => {
      console.log(params['id']); // Greift auf den 'id'-Parameter zu
      this.gameId = params['id'];

      // Verweise auf das spezifische Dokument basierend auf der ID aus den Parametern
      const gameDocRef = doc(this.firestore, `games/${this.gameId}`);

      // Hole die Daten des spezifischen Spiels und abonniere Änderungen
      docData(gameDocRef).subscribe((game: any) => {
        console.log('Game update', game);
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game. player_images = game.player_images;
        this.game.stack = game.stack;
        this.game.takeCardAnimation = game.takeCardAnimation;
        this.game.currentCard = game.currentCard;
      });
    });
  }
 

  newGame() {
    this.game = new Game();
    // Anmerkung: Der Aufruf der addDoc-Methode wurde auskommentiert, hier ist der Code unverändert
  }
  takeCard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
       // Nur wenn takeCardAnimation false ist, wird alles ausgeführt
    } else if (!this.game.takeCardAnimation) {
      this.game.currentCard = this.game.stack.pop()!;
      this.game.takeCardAnimation = true;

      console.log('New card: ' + this.game.currentCard);
      console.log('Game is', this.game);
     
      // Nächsten Spieler auswählen dank Modulo
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      this.saveGames();

      // Die Animation nach 1000 ms wiederholen
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.takeCardAnimation = false;
        this.saveGames(); // Speichern des Spiels nach der Aktion
        this.saveGames();
      }, 1000);
    }
  }



/*   takeCard() {
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
        this.saveGames(); // Speichern des Spiels nach der Aktion
      }, 1000);
    }
  } */

    editPlayer(playerId: number){
      console.log("edit player", playerId)

      const dialogRef = this.dialog.open(EditPlayerComponent);

      dialogRef.afterClosed().subscribe((change: string) => {
        if (change){
          if(change == 'DELETE'){
            this.game.player_images.splice(playerId, 1);
            this.game.players.splice(playerId, 1);
          } else {
            console.log('received change', change);
            this.game.player_images[playerId]= change;
          
          }
          this.saveGames();
        }
       
      });
      
    }



  openDialog() {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.game.player_images.push('fawkes.png');
        this.saveGames(); 
      }
    });
  }

  saveGames() {
    if (this.gameId) {
      // Verweise auf das spezifische Dokument basierend auf der ID
      const gameDocRef = doc(this.firestore, `games/${this.gameId}`);

      // Aktualisiere das Dokument mit den aktuellen Spielinformationen
      updateDoc(gameDocRef, this.game.toJson())
        .then(() => {
          console.log('Game updated successfully');
        })
        .catch((error) => {
          console.error('Error updating game:', error);
        });
    }
  }
}
