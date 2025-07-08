import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { ModalCitaModal } from '../../components/modals/cita/modal-cita.modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalNotifications } from '@capacitor/local-notifications';
import { ToastController } from '@ionic/angular';

interface CitaMedica {
  fecha: string;
  hora: string;
  medico: string;
  lugar: string;
}

@Component({
  selector: 'app-calendario',
  standalone: true,
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
})
export class CalendarioPage {
  citas: CitaMedica[] = [];

  constructor(
    private modalController: ModalController,
    private toastController: ToastController
  ) {
    this.cargarCitas();
  }

  async abrirModal() {
    const modal = await this.modalController.create({
      component: ModalCitaModal,
      componentProps: {
        modo: 'crear',
      },
    });

    await modal.present();

    const { data }: { data?: CitaMedica } = await modal.onWillDismiss();
    if (data) {
      this.citas.push(data);
      this.guardarCitas();

      // 👇 Solicita permiso SOLO después de la acción del usuario
      const permiso = await LocalNotifications.requestPermissions();
      if (permiso.display === 'granted') {
        await this.programarNotificacion(data, this.citas.length);
        await this.mostrarToast('Notificación programada con éxito');
      } else {
        await this.mostrarToast('Permiso de notificación denegado', 'warning');
      }
    }
  }

  async editarCita(index: number) {
    const modal = await this.modalController.create({
      component: ModalCitaModal,
      componentProps: {
        modo: 'editar',
        cita: this.citas[index],
      },
    });

    await modal.present();

    const { data }: { data?: CitaMedica } = await modal.onWillDismiss();
    if (data) {
      this.citas[index] = data;
      this.guardarCitas();
    }
  }

  async eliminarCita(index: number) {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta cita? Esta acción no se puede deshacer.');
    if (confirmacion) {
      this.citas.splice(index, 1);
      this.guardarCitas();
    }
  }

  async borrarCitas() {
    const confirmacion = confirm('¿Estás seguro de que deseas borrar todas las citas? Esta acción no se puede deshacer.');
    if (confirmacion) {
      this.citas = [];
      this.guardarCitas();
    }
  }

  guardarCitas() {
    localStorage.setItem('citas', JSON.stringify(this.citas));
  }

  cargarCitas() {
    const data = localStorage.getItem('citas');
    if (data) {
      this.citas = JSON.parse(data);
    }
  }

  async programarNotificacion(cita: CitaMedica, index: number) {
    const fechaCita = new Date(`${cita.fecha} ${cita.hora}`);
    const unaHoraAntes = new Date(fechaCita.getTime() - 60 * 60 * 1000);

    await LocalNotifications.schedule({
      notifications: [
        {
          id: index,
          title: 'Recordatorio de Cita Médica',
          body: `Tienes una cita con ${cita.medico} a las ${cita.hora} en ${cita.lugar}`,
          schedule: { at: unaHoraAntes },
          sound: 'beep.wav',
          smallIcon: 'ic_stat_icon_config_sample',
          iconColor: '#488AFF'
        }
      ]
    });
  }

  async mostrarToast(mensaje: string, color: string = 'success') {
  const toast = await this.toastController.create({
    message: mensaje,
    duration: 2500,
    color,
    position: 'bottom',
  });
  await toast.present();
}

}
