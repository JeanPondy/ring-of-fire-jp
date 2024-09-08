import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Für die Navigation zu einer anderen Route
import { Firestore, collection, addDoc } from '@angular/fire/firestore'; // addDoc importieren
import { Game } from '../../models/game'; 

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [], // Hier kannst du weitere Module hinzufügen, falls nötig
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss'] // Korrektur: styleUrls statt styleUrl
})
export class StartScreenComponent {

  constructor(private firestore: Firestore, private router: Router) { } // Inject Firestore und Router

  newGame() {
    // Erstelle ein neues Spiel
    let game = new Game();

    // Referenziere die Sammlung 'games' in Firestore
    const gamesCollection = collection(this.firestore, 'games');

    // Füge ein neues Spiel-Dokument in Firestore hinzu
    addDoc(gamesCollection, game.toJson())
      .then((gameInfo:any) => {
        // Navigiere zur Spielseite nach erfolgreicher Dokumenterstellung
        this.router.navigateByUrl('/game/' + gameInfo.id);
      })
      .catch((error) => {
        console.error('Error adding new game document: ', error);
      });
  }
}
