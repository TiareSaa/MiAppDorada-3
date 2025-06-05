import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service'; // Asegúrate de tener este servicio implementado

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  userData = {
    photo: '',
    nickname: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    gender: '',
    city: ''
  };

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {}

  async logout() {
    await this.authService.logout();
  }

  async deleteAccount() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas eliminar tu cuenta?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await this.authService.deleteAccount(); // Asegúrate de implementar este método
          },
        },
      ],
    });
    await alert.present();
  }

  changePhoto() {
    // Puedes implementar lógica para usar la cámara o seleccionar de galería
    alert('Función de cambiar foto no implementada aún.');
  }

  saveChanges() {
    // Aquí puedes implementar la lógica para guardar los cambios del perfil
    alert('Función de guardar cambios no implementada aún.');
  }
}

