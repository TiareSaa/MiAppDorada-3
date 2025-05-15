import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonGrid, IonRow, IonCol,
  IonCard, IonIcon, IonHeader, IonButtons, IonToolbar, IonTitle, IonBackButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [IonToolbar, IonButtons, IonHeader, IonTitle, IonBackButton,
    CommonModule, FormsModule,
    IonContent, IonGrid, IonRow, IonCol,
    IonCard, IonIcon
  ],
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss']
})
export class ActividadesPage implements OnInit {
  categorias: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.categorias = [
      { nombre: 'Ejercicios Físicos', color: '#43a047', icono: 'walk' },
      { nombre: 'Ejercicios Mentales', color: '#5e35b1', icono: 'bulb' },
      { nombre: 'Juegos', color: '#039be5', icono: 'game-controller' },
      { nombre: 'Relajación', color: '#00897b', icono: 'leaf' },
      { nombre: 'Otras Actividades', color: '#ffb300', icono: 'book' }
    ];
  }

  abrirDetalle(nombreCategoria: string) {
    this.router.navigateByUrl(`/actividad-detalle/${encodeURIComponent(nombreCategoria)}`, {
      state: { categoria: nombreCategoria }
    });
  }
}
