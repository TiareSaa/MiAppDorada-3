import { Component, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SafePipe } from 'src/app/pipes/safe.pipe';

@Component({
  selector: 'app-modal-ejercicio',
  standalone: true,
  imports: [IonicModule, CommonModule, SafePipe],
  templateUrl: './modal-ejercicio.component.html',
  styleUrls: ['./modal-ejercicio.component.scss']
})
export class ModalEjercicioComponent {
  @Input() titulo!: string;
  @Input() descripcion!: string;
  @Input() videoUrl!: string;

  constructor(private modalController: ModalController) {}

  cerrar() {
    this.modalController.dismiss();
  }
}
