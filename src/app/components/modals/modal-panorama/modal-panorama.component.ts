import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalController, IonicModule} from '@ionic/angular';
import { Panorama } from 'src/app/services/panorama.service';


@Component({
  selector: 'app-modal-panorama',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './modal-panorama.component.html',
})
export class ModalPanoramaComponent {
  @Input() evento: any;

  constructor(private modalCtrl: ModalController) {}

  cerrar() {
    this.modalCtrl.dismiss();
  }

  inscribirse() {
    alert('¡Inscripción enviada con éxito!');
    this.modalCtrl.dismiss();
  }
  
  verEnMapa() {
    alert('Abriendo mapa para el evento: ' + this.evento.titulo);
    this.modalCtrl.dismiss();
    const ubicacion = this.evento.ubicacion;
    if (ubicacion && ubicacion.latitude && ubicacion.longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${ubicacion.latitude},${ubicacion.longitude}`;
      window.open(url, '_blank');
    } else {
      console.error('Ubicación no disponible para este evento.');
    }
  }
}
