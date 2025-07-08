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
  selector: 'app-consejos-detalle',
  standalone: true,
  templateUrl: './consejos-detalle.page.html',
  styleUrls: ['./consejos-detalle.page.scss'],
  imports: [
    CommonModule, FormsModule,
    IonCard, IonCardHeader, IonCardContent, IonCardTitle,
    IonCol, IonGrid, IonRow,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton
  ]
})
export class ConsejosDetallePage implements OnInit {
  categoriaSeleccionada: string = '';
  consejosFiltrados: any[] = [];

  constructor(private router: Router, private http: HttpClient) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { categoria: string };
    if (state?.categoria) {
      this.categoriaSeleccionada = state.categoria;
    }
  }

  ngOnInit(): void {
    this.http.get<any[]>('assets/data/consejos.json').subscribe(data => {
      this.consejosFiltrados = data.filter(a => a.categoria === this.categoriaSeleccionada);
    });
  }

  abrirGuia(consejos: any) {
    this.router.navigateByUrl('/consejos-guia/:id', {
      state: { consejos }
    });
  }
}
