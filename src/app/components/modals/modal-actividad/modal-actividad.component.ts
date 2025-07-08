import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-actividad',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './modal-actividad.component.html',
  styleUrls: ['./modal-actividad.component.scss']
})
export class ModalActividadComponent {
  @Input() actividad: any;
  modo: 'texto' | 'imagen' = 'imagen';

  constructor(private modalCtrl: ModalController) {}

  cerrar() {
    this.modalCtrl.dismiss();
  }

  mostrar(modo: 'texto' | 'imagen') {
    this.modo = modo;
  }

  completar() {
    alert('¡Actividad completada! 🎉');
    this.modalCtrl.dismiss();
  }
}
