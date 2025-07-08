import { Component, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonButton, IonInput, IonItem, IonLabel, IonDatetime, IonSelect, IonSelectOption, IonToolbar, IonTitle, IonHeader, IonContent, IonButtons, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-modal-profile-edit',
  standalone: true,
  templateUrl: './modal-profile-edit.component.html',
  styleUrls: ['./modal-profile-edit.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonDatetime,
    IonSelect,
    IonSelectOption,
    IonToolbar,
    IonTitle,
    IonHeader,
    IonContent,
    IonButtons,
    IonIcon
  ]
})
export class ModalProfileEditComponent {
  @Input() initialData: any = {};
  editForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private toastCtrl: ToastController
  ) {
    this.editForm = this.fb.group({
      nickname: [''],
      birthdate: [''],
      gender: [''],
      city: ['']
    });
  }

  ngOnInit() {
    this.editForm.patchValue(this.initialData);
  }

  async guardar() {
    if (this.editForm.valid) {
      this.modalCtrl.dismiss(this.editForm.value);
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Completa los campos correctamente.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}
