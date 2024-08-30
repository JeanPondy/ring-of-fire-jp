import { Component } from '@angular/core';
import { Router } from '@angular/router';   // start game 1

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  constructor(private router: Router) { }   // start game 2

  newGame() {
    // start game 3
    this.router.navigateByUrl('/game');
  }
}
