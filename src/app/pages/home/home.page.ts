import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular'; 
import { PoliticaPrivacidadModal } from 'src/app/components/modals/politica-privacidad/politica-privacidad.modal';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, IonicModule], // 👈 Limpio ahora
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  aceptaPolitica = false;

  constructor(
    private router: Router,
    private modalController: ModalController
  ) {
    this.verificarAceptacion();
  }

  async verPolitica() {
    const modal = await this.modalController.create({
      component: PoliticaPrivacidadModal,
      showBackdrop: true,
      backdropDismiss: true,
      animated: true,
    });

    await modal.present();
  }

  verificarAceptacion() {
    const acepto = localStorage.getItem('aceptoPolitica');
    if (acepto === 'true') {
      this.router.navigate(['/login']);
    }
  }

  aceptarPolitica() {
    localStorage.setItem('aceptoPolitica', 'true');
    this.router.navigate(['/login']);
  }
}
