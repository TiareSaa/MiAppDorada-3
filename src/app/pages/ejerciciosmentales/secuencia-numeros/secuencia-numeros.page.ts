import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-secuencia-numeros',
  standalone: true,
  templateUrl: './secuencia-numeros.page.html',
  styleUrls: ['./secuencia-numeros.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})

export class SecuenciaNumerosPage implements OnInit {
  secuencia: number[] = [];
  respuestaUsuario = '';
  mensaje = '';
  colorMensaje = '';
  mostrarSecuencia = true;
  nivel = 3;

  ngOnInit() {
    this.generarSecuencia();
  }

  generarSecuencia() {
    this.secuencia = Array.from({ length: this.nivel }, () => Math.floor(Math.random() * 10));
    console.log('Secuencia generada:', this.secuencia); // ✅ revisa esto
    this.mostrarSecuencia = true;
    setTimeout(() => this.mostrarSecuencia = false, 2000);
  }

  verificar() {
    const secuenciaIngresada = this.respuestaUsuario.trim().replace(/\s+/g, '');
    const secuenciaCorrecta = this.secuencia.join('');
    console.log('Secuencia correcta:', secuenciaCorrecta); // ✅ revisa esto
    console.log('Secuencia ingresada:', secuenciaIngresada);

    if (secuenciaIngresada === secuenciaCorrecta) {
      this.mensaje = '¡Correcto! Bien hecho.';
      this.colorMensaje = 'success';
    } else {
      this.mensaje = 'Incorrecto. Inténtalo de nuevo.';
      this.colorMensaje = 'danger';
    }
  }

  reiniciar() {
    this.respuestaUsuario = '';
    this.mensaje = '';
    this.colorMensaje = '';
    this.generarSecuencia();
  }
}
