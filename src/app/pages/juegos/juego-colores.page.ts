import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-juego-colores',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './juego-colores.page.html',
  styleUrls: ['./juego-colores.page.scss'],
})
export class JuegoColoresPage implements OnInit {
  gridSize = 2;
  nivel = 1;
  blocks: string[] = [];
  correctIndex = 0;
  baseColor = '';
  differentColor = '';

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {
    this.generarJuego();
  }

  generarJuego() {
    const base = this.generarColor();
    const diff = this.generarColorParecido(base);

    this.baseColor = base;
    this.differentColor = diff;
    this.correctIndex = Math.floor(Math.random() * this.gridSize * this.gridSize);

    this.blocks = Array(this.gridSize * this.gridSize).fill(base);
    this.blocks[this.correctIndex] = diff;
  }

  generarColor(): string {
    const r = this.rand(100, 200);
    const g = this.rand(100, 200);
    const b = this.rand(100, 200);
    return `rgb(${r}, ${g}, ${b})`;
  }

  generarColorParecido(color: string): string {
    const [r, g, b] = color.match(/\d+/g)!.map(Number);
    return `rgb(${r + 15}, ${g - 10}, ${b + 10})`;
  }

  rand(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  async seleccionar(index: number) {
    if (index === this.correctIndex) {
      const alert = await this.alertCtrl.create({
        header: '¡Bien hecho!',
        message: '¡Encontraste el color diferente!',
        buttons: ['Continuar']
      });
      await alert.present();

      if (this.gridSize < 6) {
        this.gridSize++;
        this.nivel++;
      }
      this.generarJuego();
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Ups...',
        message: 'Ese no es el color distinto. Inténtalo de nuevo.',
        buttons: ['Reintentar']
      });
      await alert.present();
    }
  }

  reiniciarJuego() {
    this.gridSize = 2;
    this.nivel = 1;
    this.generarJuego();
  }
}