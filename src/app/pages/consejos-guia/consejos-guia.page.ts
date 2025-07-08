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
  selector: 'app-consejos-guia',
  standalone: true,
  templateUrl: './consejos-guia.page.html',
  styleUrls: ['./consejos-guia.page.scss'],
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonButtons, IonBackButton, IonSegment, IonSegmentButton,
    IonLabel, IonGrid, IonRow, IonCol, IonCard, IonList, IonItem
  ]
})
export class ConsejosGuiaPage implements OnInit {
  consejos: any;
  modoVisual: 'imagen' | 'texto' = 'imagen';

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { consejos: any };
    if (state?.consejos) {
      this.consejos = state.consejos;
    }
  }

  ngOnInit(): void {}
}
