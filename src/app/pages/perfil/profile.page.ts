import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Auth, deleteUser, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CaregiverModalComponent } from '../../components/modals/caregiver-modal/caregiver-modal.component';
import { IonInput, IonButton, IonItem, IonLabel, IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonDatetime, IonSelect, IonSelectOption } from '@ionic/angular/standalone'; // Asegúrate de importar IonInput desde Ionic standalone si lo necesitas

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonDatetime, IonIcon, IonContent, IonTitle, IonToolbar, IonHeader, IonSelect, IonSelectOption, CommonModule,
  
    FormsModule,
    ReactiveFormsModule,
    IonInput,
    IonButton,
    IonItem,
    IonLabel
  ],
  providers: [ToastController, ModalController]
})
export class ProfilePage implements OnInit {
  profileForm: FormGroup;
  profilePhoto: string = 'assets/icon/avatar-placeholder.png';

  // Solo estos campos son editables
  editableFields: { [key: string]: boolean } = {
    nickname: false,
    city: false,
    birthdate: false,
    gender: false
  };

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private toastController: ToastController,
    private modalController: ModalController
  ) {
    this.profileForm = this.fb.group({
      nickname: [''],
      name: [''],
      lastname: [''],
      email: [''],
      birthdate: [''],
      gender: [''],
      city: [''],
      mainCaregiver: this.fb.group({
        name: [''],
        phone: [''],
        email: ['']
      })
    });
  }

  async ngOnInit() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const docRef = doc(this.firestore, 'usuarios', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          this.profileForm.patchValue({
            nickname: data['nickname'] || '',
            name: data['name'] || '',
            lastname: data['lastname'] || '',
            email: data['email'] || '',
            birthdate: data['birthdate'] || '',
            gender: data['gender'] || '',
            city: data['city'] || '',
            mainCaregiver: data['mainCaregiver'] || { name: '', phone: '', email: '' }
          });
          if (data['photo']) {
            this.profilePhoto = data['photo'];
          }
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  toggleEdit(field: string) {
    this.editableFields[field] = !this.editableFields[field];
  }

  isFieldEditable(field: string): boolean {
    return this.editableFields[field];
  }

  getFieldValue(field: string): string {
    return this.profileForm.get(field)?.value || '';
  }

  setFieldValue(field: string, value: string | null | undefined) {
    this.profileForm.get(field)?.setValue(value ?? '');
  }

  setBirthdateFromEvent(event: any) {
    let value = event.detail.value;
    if (Array.isArray(value)) {
      value = value[0];
    }
    this.setFieldValue('birthdate', value);
  }

  async changePhoto() {
    const toast = await this.toastController.create({
      message: 'Función de edición de foto no implementada aún',
      duration: 2000,
      position: 'middle',
      color: 'medium'
    });
    await toast.present();
  }

  async saveChanges() {
    const user = this.auth.currentUser;
    if (user) {
      const docRef = doc(this.firestore, 'usuarios', user.uid);
      await setDoc(
        docRef,
        {
          nickname: this.profileForm.value.nickname,
          birthdate: this.profileForm.value.birthdate,
          gender: this.profileForm.value.gender,
          city: this.profileForm.value.city,
          mainCaregiver: this.profileForm.value.mainCaregiver
        },
        { merge: true }
      );

      const toast = await this.toastController.create({
        message: 'Perfil actualizado exitosamente',
        duration: 2000,
        color: 'success',
        position: 'middle'
      });
      await toast.present();
    }
  }

  async logout() {
    await this.auth.signOut();
    this.router.navigate(['/login']);
  }

  async deleteAccount() {
    const user = this.auth.currentUser;
    if (user) {
      await deleteUser(user);
      const toast = await this.toastController.create({
        message: 'Cuenta eliminada',
        duration: 2000,
        color: 'danger',
        position: 'middle'
      });
      await toast.present();
      this.router.navigate(['/login']);
    }
  }

  async openCaregiverModal() {
    const caregiver = this.profileForm.value.mainCaregiver || { name: '', phone: '', email: '' };

    const modal = await this.modalController.create({
      component: CaregiverModalComponent,
      componentProps: {  data: this.profileForm.value.mainCaregiver || {} }
    });

    modal.onDidDismiss().then(async (res) => {
        if (res.data) {
          // Guarda los datos del cuidador en el form principal
          this.profileForm.get('mainCaregiver')?.setValue(res.data);
          await this.saveChanges(); // O guarda después
        }
      });

    await modal.present();
  }
}
