import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Panorama {
  titulo: string;
  descripcion: string;
  fecha: string;
  lugar: string;
  foto?: string; // opcional
}

@Injectable({
  providedIn: 'root'
})
export class PanoramasService {

  constructor(private firestore: Firestore) {}

  getPanoramas(): Observable<Panorama[]> {
    const panoramasRef = collection(this.firestore, 'panoramas');
    return collectionData(panoramasRef, { idField: 'id' }) as Observable<Panorama[]>;
  }
}
