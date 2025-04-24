// src/app/pages/calendario/modal-cita.modal.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalController, IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-cita',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  templateUrl: './modal-cita.modal.html',
  styleUrls: ['./modal-cita.modal.scss']
})
export class ModalCitaModal {
  form: FormGroup;

  constructor(private fb: FormBuilder, private modalCtrl: ModalController) {
    this.form = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      medico: ['', Validators.required],
      lugar: ['', Validators.required],
    });
  }

  guardar() {
    if (this.form.valid) {
      this.modalCtrl.dismiss(this.form.value);
    }
  }

  cerrar() {
    this.modalCtrl.dismiss(null);
  }
}
