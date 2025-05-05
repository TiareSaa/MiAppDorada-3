import { Component, OnInit } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalMedicamentoComponent } from 'src/app/components/modals/modal-medicamento/modal-medicamento.component';

@Component({
  selector: 'app-medicamentos',
  standalone: true,
  templateUrl: './medicamentos.page.html',
  styleUrls: ['./medicamentos.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class MedicamentosPage implements OnInit {
  medicamentos: any[] = [];

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
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
    }
  }

  eliminarMedicamento(index: number) {
    this.medicamentos.splice(index, 1);
    this.guardarMedicamentos();
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
}
