import { Component, OnInit } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalMedicamentoComponent } from 'src/app/components/modals/modal-medicamento/modal-medicamento.component';
import { LocalNotifications } from '@capacitor/local-notifications';

interface Medicamento {
  nombre: string;
  dosis: string;
  hora: string; // formato 'HH:mm'
  frecuencia?: string;
  notas?: string;
  [key: string]: any; // para que no marque error con campos adicionales
}

@Component({
  selector: 'app-medicamentos',
  standalone: true,
  templateUrl: './medicamentos.page.html',
  styleUrls: ['./medicamentos.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class MedicamentosPage implements OnInit {
  medicamentos: Medicamento[] = [];

  constructor(private modalCtrl: ModalController) {}

  async ngOnInit() {
    await this.solicitarPermisoNotificaciones();
    this.cargarMedicamentos();
  }

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: ModalMedicamentoComponent,
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.medicamentos.push(data);
      this.guardarMedicamentos();
      await this.programarNotificacion(data, this.medicamentos.length);
    }
  }

  async editarMedicamento(index: number) {
    const modal = await this.modalCtrl.create({
      component: ModalMedicamentoComponent,
      componentProps: {
        medicamento: this.medicamentos[index],
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.medicamentos[index] = data;
      this.guardarMedicamentos();
      await this.cancelarNotificacion(index + 1);
      await this.programarNotificacion(data, index + 1);
    }
  }

  async eliminarMedicamento(index: number) {
    this.medicamentos.splice(index, 1);
    this.guardarMedicamentos();
    await this.cancelarNotificacion(index + 1);
  }

  guardarMedicamentos() {
    localStorage.setItem('medicamentos', JSON.stringify(this.medicamentos));
  }

  cargarMedicamentos() {
    const data = localStorage.getItem('medicamentos');
    if (data) {
      this.medicamentos = JSON.parse(data);
    }
  }

  async solicitarPermisoNotificaciones() {
    const permiso = await LocalNotifications.requestPermissions();
    if (permiso.display !== 'granted') {
      console.warn('El usuario no otorgó permisos para notificaciones');
    }
  }

  async programarNotificacion(medicamento: Medicamento, id: number) {
    const ahora = new Date();
    const [hora, minutos] = medicamento.hora.split(':').map(Number);

    const fechaNotificacion = new Date(
      ahora.getFullYear(),
      ahora.getMonth(),
      ahora.getDate(),
      hora,
      minutos
    );

    // Restar 5 minutos
    fechaNotificacion.setMinutes(fechaNotificacion.getMinutes() - 5);

    // Si ya pasó, no notificar
    if (fechaNotificacion.getTime() < ahora.getTime()) {
      console.warn('No se programó la notificación porque la hora ya pasó');
      return;
    }

    await LocalNotifications.schedule({
      notifications: [
        {
          id,
          title: 'Hora de tu medicamento',
          body: `Toma ${medicamento.dosis} de ${medicamento.nombre} a las ${medicamento.hora}`,
          schedule: { at: fechaNotificacion },
          sound: 'beep.wav',
          smallIcon: 'ic_stat_icon_config_sample',
          iconColor: '#9C27B0'
        }
      ]
    });
  }

  async cancelarNotificacion(id: number) {
    await LocalNotifications.cancel({ notifications: [{ id }] });
  }
}
