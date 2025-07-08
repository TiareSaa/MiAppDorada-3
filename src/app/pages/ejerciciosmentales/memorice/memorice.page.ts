import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-memorice',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './memorice.page.html',
  styleUrls: ['./memorice.page.scss'],
})
export class MemoricePage implements OnInit {
  board: any[] = [];
  flippedIndexes: number[] = [];
  score = 0;
  totalPairs = 8;
  backImage = 'assets/naipes/back.png'; // imagen de carta de espaldas

  ngOnInit() {
    this.resetGame();
  }

  shuffle(array: any[]) {
    return array.sort(() => Math.random() - 0.5);
  }

  isFlipped(i: number): boolean {
    return this.flippedIndexes.includes(i) || this.board[i].matched;
  }

  getCardImage(i: number, card: any): string {
    return this.isFlipped(i) ? card.image : this.backImage;
  }

  flipCard(i: number) {
    if (this.flippedIndexes.length < 2 && !this.board[i].matched && !this.flippedIndexes.includes(i)) {
      this.flippedIndexes.push(i);

      if (this.flippedIndexes.length === 2) {
        const [first, second] = this.flippedIndexes;
        const match = this.board[first].image === this.board[second].image;

        setTimeout(() => {
          if (match) {
            this.board[first].matched = true;
            this.board[second].matched = true;
            this.score++;
          }
          this.flippedIndexes = [];
        }, 1000);
      }
    }
  }

  resetGame() {
    this.score = 0;
    this.flippedIndexes = [];

    const images = [
      'assets/naipes/1.png',
      'assets/naipes/2.png',
      'assets/naipes/3.png',
      'assets/naipes/4.png',
      'assets/naipes/5.png',
      'assets/naipes/6.png',
      'assets/naipes/7.png',
      'assets/naipes/8.png',
    ];

    const cards = [...images, ...images].map((img, index) => ({
      image: img,
      matched: false,
      id: index,
    }));

    this.board = this.shuffle(cards);
  }
}