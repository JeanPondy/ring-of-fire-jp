export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
  
    constructor() {
      for (let i = 1; i <= 13; i++) { // Korrigiert, um auch die 13 einzuschließen
        this.stack.push('spades_' + i);
        this.stack.push('clubs_' + i);
        this.stack.push('diamonds_' + i);
        this.stack.push('hearts_' + i);
      }
      this.shuffle(this.stack); // Die shuffle-Methode aufrufen
    }
  
    // Methode zum Mischen des Arrays
    private shuffle(array: string[]): void {
      let currentIndex = array.length;
  
      while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
  
        // Tausche das aktuelle Element mit einem zufälligen Element
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]
        ];
      }
    }
  }
  