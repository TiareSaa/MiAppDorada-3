import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalController, IonicModule} from '@ionic/angular';


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
}
