import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ModalPanoramaComponent } from 'src/app/components/modals/modal-panorama/modal-panorama.component';
import { HttpClient } from '@angular/common/http';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonGrid, IonCol, IonCardTitle, IonCardContent, IonCardSubtitle, IonCardHeader, IonRow, IonSearchbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { PanoramasService } from 'src/app/services/panorama.service';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-panoramas',
  templateUrl: './panoramas.page.html',
  styleUrls: ['./panoramas.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonSearchbar, IonRow, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonCol, IonGrid, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  providers: [ModalController]
})
export class PanoramasPage implements OnInit {
  panoramas: any[] = [];
  panoramasOriginales: any[] = [];
  filtro: string = '';

  constructor(private panoramasService: PanoramasService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.panoramasService.getPanoramas().subscribe((data: any[]) => {
      this.panoramas = data.map((p: any) => {
        if (p.fecha instanceof Timestamp) {
          const dateObj = p.fecha.toDate();
          p.fechaFormateada = this.formatearFecha(dateObj);
          p.hora = this.formatearHora(dateObj);
        }
        return p;
      });

      this.panoramasOriginales = [...this.panoramas];
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
    formatearFecha(fecha: Date): string {
    return fecha.toLocaleDateString('es-CL', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  }

    formatearHora(fecha: Date): string {
    return fecha.toLocaleTimeString('es-CL', {
      hour: '2-digit', minute: '2-digit'
    });
  }
}

