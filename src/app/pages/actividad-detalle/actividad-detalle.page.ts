import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalController, IonicModule } from '@ionic/angular';
import { ModalEjercicioComponent } from '../../components/modals/modal-ejercicio/modal-ejercicio.component';


@Component({
  selector: 'app-actividad-detalle',
  standalone: true,
  templateUrl: './actividad-detalle.page.html',
  styleUrls: ['./actividad-detalle.page.scss'],
  imports: [
    CommonModule, FormsModule, IonicModule
  ]
})
export class ActividadDetallePage implements OnInit {
  categoriaSeleccionada: string = '';
  actividadesFiltradas: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient,
    private modalController: ModalController
  ) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { categoria: string };
    if (state?.categoria) {
      this.categoriaSeleccionada = state.categoria;
    }
  }

  ngOnInit(): void {
    this.http.get<any[]>('assets/data/actividades.json').subscribe(data => {
      this.actividadesFiltradas = data.filter(a => a.categoria === this.categoriaSeleccionada);
    });
  }

  esEjercicioFisico(): boolean {
    return this.categoriaSeleccionada === 'Ejercicios Físicos';
  }

  abrirGuia(actividad: any) {
    if (actividad.titulo === 'Respiración Guiada') {
      this.router.navigateByUrl('/respiracion');
    } else if (actividad.titulo === 'Juego de Colores') {
      this.router.navigateByUrl('/juego-colores');
    } else if (actividad.titulo === 'Memorice de Naipes') {
      this.router.navigateByUrl('/memorice');
    } else if (actividad.titulo === 'Secuencia de Números') {
      this.router.navigateByUrl('/secuencia-numeros');
    } else {
      this.router.navigateByUrl('/actividad-guia', {
        state: { actividad }
      });
    }
  }

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