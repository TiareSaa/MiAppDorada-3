import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-medicamento',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './modal-medicamento.component.html',
  styleUrls: ['./modal-medicamento.component.scss'],
})
export class ModalMedicamentoComponent implements OnInit {
  @Input() medicamento: any = null;
  form: FormGroup;

  constructor(private fb: FormBuilder, private modalCtrl: ModalController) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      dosis: ['', Validators.required],
      hora: ['', Validators.required],
      frecuencia: [''],
      duracion: [''],
      via: [''],
      cantidad: [''],
      fechaInicio: [''],
      fechaFin: [''],
      observaciones: ['']
    });
  }

  ngOnInit() {
    if (this.medicamento) {
      this.form.patchValue(this.medicamento);
    }
    
    // Recalcular automáticamente la fechaFin
    this.form.get('fechaInicio')?.valueChanges.subscribe(() => this.actualizarFechaFin());
    this.form.get('cantidad')?.valueChanges.subscribe(() => this.actualizarFechaFin());
  }

  private actualizarFechaFin() {
    const fechaInicio = this.form.get('fechaInicio')?.value;
    const cantidad = this.form.get('cantidad')?.value;

    if (fechaInicio && cantidad) {
      const fechaFin = new Date(fechaInicio);
      fechaFin.setDate(fechaFin.getDate() + cantidad - 1); // Restar 1 para incluir la fecha de inicio
      this.form.get('fechaFin')?.setValue(fechaFin.toISOString().substring(0, 10)); // Formato YYYY-MM-DD
    }
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  guardar() {
    if (this.form.valid) {
      this.modalCtrl.dismiss(this.form.value);
    }
  }

  cancelar() {
    this.modalCtrl.dismiss(null);
  }
}
