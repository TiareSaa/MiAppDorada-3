import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonToolbar, IonTitle,
  IonButtons, IonBackButton, IonSegment, IonSegmentButton,
  IonLabel, IonGrid, IonRow, IonCol, IonCard, IonList, IonItem
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-actividad-guia',
  standalone: true,
  templateUrl: './actividad-guia.page.html',
  styleUrls: ['./actividad-guia.page.scss'],
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonBackButton, IonSegment, IonSegmentButton,
    IonLabel, IonGrid, IonRow, IonCol, IonCard, IonList, IonItem
  ]
})
export class ActividadGuiaPage implements OnInit {
  actividad: any;
  modoVisual: 'imagen' | 'texto' = 'imagen';

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { actividad: any };
    if (state?.actividad) {
      this.actividad = state.actividad;
    }
  }

  ngOnInit(): void {}
}
