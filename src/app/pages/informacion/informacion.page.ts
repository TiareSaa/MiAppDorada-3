import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-informacion',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './informacion.page.html',
  styleUrls: ['./informacion.page.scss']
})
export class InformacionPage {

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController
  ) {}

  async cerrar() {
    // Si es un modal, ciérralo
    const topModal = await this.modalCtrl.getTop();
    if (topModal) {
      this.modalCtrl.dismiss();
    } else {
      // Si es una página normal, navega hacia atrás
      this.navCtrl.back();
    }
  }
}
