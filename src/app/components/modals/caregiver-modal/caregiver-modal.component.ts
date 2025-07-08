import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonHeader, IonButton, IonButtons, IonContent, IonItem, IonLabel, IonToolbar, IonTitle, IonInput } from "@ionic/angular/standalone";


@Component({
  selector: 'app-caregiver-modal',
  templateUrl: './caregiver-modal.component.html',
  standalone: true,
  imports: [IonTitle, IonToolbar, IonHeader, IonButton, IonButtons, IonContent, IonItem, IonLabel, IonInput, CommonModule, FormsModule, ReactiveFormsModule],
})
export class CaregiverModalComponent {
  @Input() data: any; // Datos iniciales del cuidador (puede venir vacío)
  form: FormGroup;

  constructor(
    private modalController: ModalController,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [''],
      phone: [''],
      email: ['']
    });
  }

  ngOnInit() {
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  save() {
    if (this.form.valid) {
      this.modalController.dismiss(this.form.value);
    }
  }

  close() {
    this.modalController.dismiss();
  }
}
