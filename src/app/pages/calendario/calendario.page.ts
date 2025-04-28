// src/pages/calendario/calendario.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { ModalCitaModal } from '../../components/modals/cita/modal-cita.modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage {
  citas = [
    {
      fecha: 'Lunes 22 de abril',
      hora: '10:30 AM',
      medico: 'Dra. María Pérez',
      lugar: 'Centro Médico Los Álamos',
    },
    {
      fecha: 'Miércoles 24 de abril',
      hora: '08:00 AM',
      medico: 'Dr. Juan Soto',
      lugar: 'Hospital Regional',
    },
  ];

  constructor(private modalController: ModalController) {
    this.cargarCitas();
  }

  async abrirModal() {
    const modal = await this.modalController.create({
      component: ModalCitaModal,
      componentProps: {
        modo: 'crear', // nuevo para que la persona sepa que es una nueva cita
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.citas.push(data);
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

  async borrarCitas() {
    const confirmacion = confirm('¿Estás seguro de que deseas borrar todas las citas? Esta acción no se puede deshacer.');

    if (confirmacion) {
      this.citas = [];
      this.guardarCitas();
    }
  }

  async editarCita(index: number) {
    const modal = await this.modalController.create({
      component: ModalCitaModal,
      componentProps: {
        modo: 'editar', // 👈 nuevo
        cita: this.citas[index],
      },
    });
  
    await modal.present();
  
    const { data } = await modal.onWillDismiss();
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
}
