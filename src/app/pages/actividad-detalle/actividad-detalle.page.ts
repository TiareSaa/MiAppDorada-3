import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard, IonCardHeader, IonCardContent, IonCardTitle,
  IonCol, IonGrid, IonRow, IonBackButton, IonButtons, IonHeader, IonTitle, IonToolbar, IonContent
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-actividad-detalle',
  standalone: true,
  templateUrl: './actividad-detalle.page.html',
  styleUrls: ['./actividad-detalle.page.scss'],
  imports: [
    CommonModule, FormsModule,
    IonCard, IonCardHeader, IonCardContent, IonCardTitle,
    IonCol, IonGrid, IonRow,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton
  ]
})
export class ActividadDetallePage implements OnInit {
  categoriaSeleccionada: string = '';
  actividadesFiltradas: any[] = [];

  constructor(private router: Router, private http: HttpClient) {
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

  abrirGuia(actividad: any) {
  if (actividad.titulo === 'Respiración Guiada') {
    this.router.navigateByUrl('/respiracion');
  } else {
    this.router.navigateByUrl('/actividad-guia', {
      state: { actividad }
    });
  }
}
}