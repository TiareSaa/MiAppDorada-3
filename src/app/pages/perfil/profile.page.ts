import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Auth, deleteUser, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProfilePage implements OnInit {
  profileForm: FormGroup;
  profilePhoto: string = 'assets/icon/avatar-placeholder.png';

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private toastController: ToastController
  ) {
    this.profileForm = this.fb.group({
      nickname: [''],
      name: [''],
      lastname: [''],
      email: [''],
      birthdate: [''],
      gender: [''],
      city: ['']
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
          city: data['city'] || ''
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
      await setDoc(docRef, {
        nickname: this.profileForm.value.nickname,
        birthdate: this.profileForm.value.birthdate,
        gender: this.profileForm.value.gender,
        city: this.profileForm.value.city
      }, { merge: true });

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
}
