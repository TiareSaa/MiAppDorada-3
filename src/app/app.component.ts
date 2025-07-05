import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet, IonHeader, IonMenu, IonToolbar, IonTitle, 
          IonContent, IonList,IonItem, IonMenuToggle, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonHeader, IonMenu, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonMenuToggle, IonLabel],
})
export class AppComponent {
  constructor(private auth: Auth, private router: Router) {}
  async logout() {
    await this.auth.signOut();
    this.router.navigate(['/login']);
  }

  navigateTo(route: string) {
  this.router.navigate([route]);
}

}
