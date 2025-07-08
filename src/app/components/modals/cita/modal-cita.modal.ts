// src/app/pages/calendario/modal-cita.modal.ts
import { Component, Input, OnInit } from '@angular/core';
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
export class ModalCitaModal implements OnInit { 
  @Input() modo: 'crear' | 'editar' = 'crear';
  @Input() cita: any = null;

  form: FormGroup; //  formulario reactivo

  constructor(private fb: FormBuilder, private modalCtrl: ModalController) {
    this.form = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      medico: ['', Validators.required],
      lugar: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (this.modo === 'editar' && this.cita) {
      this.form.patchValue(this.cita); // carga los datos de la cita en el formulario
    }
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
