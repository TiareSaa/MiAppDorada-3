import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { PanicService } from '../../services/panic.service';

@Component({
  selector: 'app-panic',
  templateUrl: './panic.page.html',
  styleUrls: ['./panic.page.scss'],
  standalone: true,
  imports: [IonButton, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PanicPage implements OnInit {

  constructor(private panicService: PanicService) { }

  ngOnInit() {
    this.panicService.preloadAlarm();
  }
  activateAlarm() {
    this.panicService.activateAlarm();
  }
  async triggerPanic() {
    await this.panicService.activateAlarm();
  }

}