import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  IonCard, IonCardHeader, IonCardContent, IonCardTitle,
  IonCol, IonGrid, IonIcon, IonRow, IonContent, IonHeader, IonToolbar, IonTitle
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonCard, IonCardHeader, IonCardContent, IonCardTitle,
    IonCol, IonGrid, IonIcon, IonRow,
    IonContent, IonHeader, IonToolbar, IonTitle
  ],
  templateUrl: './actividades.page.html'
})
export class ActividadesPage implements OnInit {
  categorias: any[] = [];
  actividadesFiltradas: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const categoria = this.route.snapshot.paramMap.get('categoria');
    this.http.get<any[]>('assets/data/actividades.json').subscribe(data => {
      this.actividadesFiltradas = data.filter(a => a.categoria === categoria);

      const agrupadas: any = {};
      for (const actividad of data) {
        if (!agrupadas[actividad.categoria]) {
          agrupadas[actividad.categoria] = {
            nombre: actividad.categoria,
            descripcion: `Actividades relacionadas con ${actividad.categoria.toLowerCase()}.`,
            color: actividad.color || '#607D8B',
            icono: actividad.icono || 'book'
          };
        }
      }

      this.categorias = Object.values(agrupadas);
    });
  }

  abrirDetalle(nombreCategoria: string) {
    this.router.navigateByUrl(`/actividad-detalle/${nombreCategoria}`, {
      state: { categoria: nombreCategoria }
    });
  }
}
