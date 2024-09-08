import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], // korrigiert von styleUrl zu styleUrls
})
export class AppComponent {
  firestore: Firestore = inject(Firestore);

  constructor() {
    console.log('Firestore instance:', this.firestore);
  }
}