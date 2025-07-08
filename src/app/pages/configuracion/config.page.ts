import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IonItem, IonLabel, IonToggle } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
  imports: [
    IonItem,
    IonLabel,
    IonToggle,
    FormsModule,
    IonicModule
  ]
})
export class ConfigPage {
  locationSharingEnabled = false;

  constructor(private afs: AngularFirestore, private auth: AngularFireAuth) {}

  ngOnInit() {
    this.loadSetting();
  }

    async loadSetting() {
    const user = await this.auth.currentUser;
    if (user) {
        const doc = await this.afs.collection('usuarios').doc(user.uid).get().toPromise();
        const data = doc?.data() as { locationSharingEnabled?: boolean }; // 👈 Tipo explícito
        this.locationSharingEnabled = data?.locationSharingEnabled ?? false;
    }
    }


  async updateLocationSetting() {
    const user = await this.auth.currentUser;
    if (user) {
      await this.afs.collection('usuarios').doc(user.uid).update({
        locationSharingEnabled: this.locationSharingEnabled,
      });
    }
  }
}
