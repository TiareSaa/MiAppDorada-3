import { Injectable } from '@angular/core';
import { NativeAudio } from '@capacitor-community/native-audio';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class PanicService {
  async preloadAlarm() {
    try {
        await NativeAudio.preload({
            assetId: 'alarm',
            assetPath: 'assets/audio/alarma.mp3',
            audioChannelNum: 1,
            isUrl: false,
        });
    } catch (error) {
      console.error('Error cargando sonido:', error);
      }
  }

    async activateAlarm() {
    try {
      await NativeAudio.play({ assetId: 'alarm' });
    } catch (err) {
      console.error('Error al reproducir alarma:', err);
    }

    try {
      const position = await Geolocation.getCurrentPosition();
      console.log('Ubicación:', position.coords.latitude, position.coords.longitude);
      // Aquí en el futuro: enviar notificación push con ubicación y datos del usuario
    } catch (error) {
      console.error('Error al obtener ubicación:', error);
    }
  }
}