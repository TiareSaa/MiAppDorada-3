import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-politica-privacidad-modal',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './politica-privacidad.modal.html',
  styleUrls: ['./politica-privacidad.modal.scss'],
})
export class PoliticaPrivacidadModal {
  constructor(private modalCtrl: ModalController) {}

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
