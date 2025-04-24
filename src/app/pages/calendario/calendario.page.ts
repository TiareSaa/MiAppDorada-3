// src/pages/calendario/calendario.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { ModalCitaModal } from './modal-cita.modal';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage {
  citas = [
    {
      fecha: 'Lunes 22 de abril',
      hora: '10:30 AM',
      medico: 'Dra. María Pérez',
      lugar: 'Centro Médico Los Álamos',
    },
    {
      fecha: 'Miércoles 24 de abril',
      hora: '08:00 AM',
      medico: 'Dr. Juan Soto',
      lugar: 'Hospital Regional',
    },
  ];

  constructor(private modalCtrl: ModalController) {}

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: ModalCitaModal,
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.citas.push(data);
    }
  }
}
