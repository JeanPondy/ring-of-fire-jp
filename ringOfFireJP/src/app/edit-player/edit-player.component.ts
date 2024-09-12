import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef, } from '@angular/material/dialog';




@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [CommonModule,  MatDialogModule ],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss'
})
export class EditPlayerComponent {

  allProfilePictures = [ 'aki.png','anonymous.png', 'fawkes.png', 'girl.png', 'lion.png', 'monkey-soldier.png', 'pokerface.png', 'vendetta.png', 'pavel.jpeg', 'akiba.jpeg', 'captain.jpeg', 'peppa.jpeg', 'woman.png']

  constructor(public dialogRef:  MatDialogRef<EditPlayerComponent >){}

}
