import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ModalPanoramaComponent } from 'src/app/components/modals/modal-panorama/modal-panorama.component';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonGrid, IonCol, IonCardTitle, IonCardContent, IonCardSubtitle, IonCardHeader, IonRow } from '@ionic/angular/standalone';

@Component({
  selector: 'app-panoramas',
  templateUrl: './panoramas.page.html',
  styleUrls: ['./panoramas.page.scss'],
  standalone: true,
  imports: [IonRow, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonCol, IonGrid, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  providers: [ModalController]
})
export class PanoramasPage implements OnInit {

  panoramas = [
    {
      id: 1,
      titulo: 'Taller de Memoria Activa',
      descripcion: 'Ejercicios para fortalecer la memoria en adultos mayores.',
      fecha: '2025-05-25',
      hora: '10:00 AM',
      lugar: 'Centro Comunitario El Roble',
      imagen: 'assets/img/memoria.jpg',
      requiereInscripcion: true
    },
    // puedes agregar más panoramas
  ];

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
  }
  
  async abrirDetalle(evento: any) {
    const modal = await this.modalCtrl.create({
      component: ModalPanoramaComponent,
      componentProps: { evento }
    });
  
    await modal.present();
  }
  
}
