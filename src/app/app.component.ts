import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet, IonHeader, IonMenu, IonToolbar, IonTitle, 
          IonContent, IonList,IonItem, IonMenuToggle, IonLabel, IonButton } from '@ionic/angular/standalone';
import { deleteUser } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonButton, IonApp, IonRouterOutlet, IonHeader, IonMenu, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonMenuToggle, IonLabel],
})
export class AppComponent {
  constructor(private auth: Auth, private router: Router, private toastController: ToastController) {}
  async logout() {
    await this.auth.signOut();
    this.router.navigate(['/login']);
  }

  navigateTo(route: string) {
  this.router.navigate([route]);
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
