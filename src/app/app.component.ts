import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet, IonHeader, IonMenu, IonToolbar, IonTitle, 
          IonContent, IonList,IonItem, IonMenuToggle, IonLabel, IonButton } from '@ionic/angular/standalone';
import { deleteUser } from '@angular/fire/auth';
import { AlertController, MenuController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { doc, deleteDoc, getFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonButton, IonApp, IonRouterOutlet, IonHeader, IonMenu, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonMenuToggle, IonLabel],
})
export class AppComponent {
  constructor(
    private auth: Auth, 
    private router: Router, 
    private toastController: ToastController, 
    private alertController: AlertController,
    private menuCtrl: MenuController
  ) {}

  async logout() {
    await this.auth.signOut();
    this.router.navigate(['/login']);
  }

  navigateTo(route: string) {
  this.router.navigate([route]);
}


async confirmarEliminarCuenta() {
  const confirmAlert = await this.alertController.create({
    header: '¿Eliminar cuenta?',
    message: `
      Esta acción eliminará tu cuenta y todos tus datos asociados de forma permanente.

      Esta acción no se puede deshacer.

      Por favor, asegúrate de que realmente deseas eliminar tu cuenta.
      
      ¿Deseas continuar?
    `,
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Eliminar',
        role: 'destructive',
        handler: async () => {
          const user = this.auth.currentUser;
          if (user) {
            try {
              // Eliminar datos en Firestore
              const uid = user.uid;
              const firestore = getFirestore();
              await deleteDoc(doc(firestore, 'usuarios', uid));

              // Eliminar cuenta de Firebase Auth
              await deleteUser(user);

              // Cerrar menú y redirigir
              await this.menuCtrl.close();
              this.router.navigate(['/login']);
            } catch (error) {
              const errorAlert = await this.alertController.create({
                header: 'Error',
                message: 'No se pudo eliminar la cuenta. Por favor, vuelve a iniciar sesión e inténtalo nuevamente.',
                buttons: ['OK']
              });
              await errorAlert.present();
            }
          }
        }
      }
    ]
  });

  await confirmAlert.present();
}
}
