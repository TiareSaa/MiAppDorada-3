import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-respiracion-guiada',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './respiracion.page.html',
  styleUrls: ['./respiracion.page.scss'],
})
export class RespiracionPage {
  fases = ['inhala', 'sostén', 'exhala'];
  faseIndex = 0;
  fase = 'inhala';  // Estado de clase CSS
  faseTexto = 'Inhala'; // Texto mostrado dentro del círculo
  respirando = false;
  intervalo: any;

toggleAnimacion() {
  if (this.respirando) {
    clearInterval(this.intervalo);
    this.respirando = false;
    this.fase = 'inhala';
    this.faseTexto = 'Inhala';
  } else {
    this.respirando = true;
    this.fase = ''; // <- sin clase visual por defecto
    this.faseTexto = 'Inhala';
    
    // Espera un poco para que Angular dibuje el estado base antes de crecer
    setTimeout(() => {
      this.fase = 'inhala';
    }, 50);

    this.faseIndex = 0;
    this.intervalo = setInterval(() => {
      this.faseIndex = (this.faseIndex + 1) % this.fases.length;
      this.actualizarFase();
    }, 4000);
  }
}
actualizarFase() {
  this.fase = this.fases[this.faseIndex];
  switch (this.fase) {
    case 'inhala':
      this.faseTexto = 'Inhala';
      break;
    case 'sostén':
      this.faseTexto = 'Mantén la respiración';
      break;
    case 'exhala':
      this.faseTexto = 'Exhala';
      break;
  }
} 
}
