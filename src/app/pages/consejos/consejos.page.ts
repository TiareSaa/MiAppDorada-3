import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  IonCard, IonCardHeader, IonCardContent, IonCardTitle,
  IonCol, IonGrid, IonIcon, IonRow, IonContent, IonHeader, IonToolbar, IonTitle, IonBackButton, IonButtons } from '@ionic/angular/standalone';

@Component({
  selector: 'app-consejos',
  standalone: true,
  imports: [IonButtons, IonBackButton, 
    CommonModule, FormsModule,
    IonCard, IonCardHeader, IonCardContent, IonCardTitle,
    IonCol, IonGrid, IonIcon, IonRow,
    IonContent, IonHeader, IonToolbar, IonTitle
  ],
  templateUrl: './consejos.page.html'
})
export class ConsejosPage implements OnInit {
  categorias: any[] = [];
  consejosFiltrados: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const categoria = this.route.snapshot.paramMap.get('categoria');
    this.http.get<any[]>('assets/data/consejos.json').subscribe(data => {
      this.consejosFiltrados = data.filter(a => a.categoria === categoria);

      const agrupadas: any = {};
      for (const consejos of data) {
        if (!agrupadas[consejos.categoria]) {
          agrupadas[consejos.categoria] = {
            nombre: consejos.categoria,
            descripcion: `Consejos relacionados con ${consejos.categoria.toLowerCase()}.`,
            color: consejos.color || '#607D8B',
            icono: consejos.icono || 'book'
          };
        }
      }

      this.categorias = Object.values(agrupadas);
    });
  }

  abrirDetalle(nombreCategoria: string) {
    this.router.navigateByUrl(`/consejos-detalle/${nombreCategoria}`, {
      state: { categoria: nombreCategoria }
    });
  }
}
