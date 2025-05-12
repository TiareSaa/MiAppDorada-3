import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ModalPanoramaComponent } from 'src/app/components/modals/modal-panorama/modal-panorama.component';
import { HttpClient } from '@angular/common/http';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonGrid, IonCol, IonCardTitle, IonCardContent, IonCardSubtitle, IonCardHeader, IonRow, IonSearchbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-panoramas',
  templateUrl: './panoramas.page.html',
  styleUrls: ['./panoramas.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonRow, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonCol, IonGrid, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  providers: [ModalController]
})
export class PanoramasPage implements OnInit {
  panoramas: any[] = [];
  panoramasOriginales: any[] = [];
  filtro: string = '';

  constructor(private modalCtrl: ModalController, private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('assets/data/eventos.json').subscribe(data => {
      this.panoramas = data;
      this.panoramasOriginales = [...data];
    });
  }

  async abrirDetalle(evento: any) {
    const modal = await this.modalCtrl.create({
      component: ModalPanoramaComponent,
      componentProps: { evento }
    });

    await modal.present();
  }

  filtrarPanoramas() {
    const searchTerm = this.filtro.trim().toLowerCase();

    if (!searchTerm) {
      this.panoramas = [...this.panoramasOriginales];
    } else {
      this.panoramas = this.panoramasOriginales.filter(p =>
        p.titulo.toLowerCase().includes(searchTerm)
      );
    }
  }
}

