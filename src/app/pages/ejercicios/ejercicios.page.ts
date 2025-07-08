import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalEjercicioComponent } from '../../components/modals/modal-ejercicio/modal-ejercicio.component';

@Component({
  selector: 'app-ejercicios',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './ejercicios.page.html',
  styleUrls: ['./ejercicios.page.scss']
})
export class EjerciciosPage {

  constructor(private modalController: ModalController) {}

  async abrirModal(titulo: string, descripcion: string, videoUrl: string) {
    const modal = await this.modalController.create({
      component: ModalEjercicioComponent,
      componentProps: {
        titulo,
        descripcion,
        videoUrl
      }
    });
    return await modal.present();
  }
}
