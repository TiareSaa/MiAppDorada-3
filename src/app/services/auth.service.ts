import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, last } from 'rxjs';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    this.auth.onAuthStateChanged((user) => {
      this.userSubject.next(user);
    });
  }

  // Registro
  async register(
    name: string, 
    lastname: string, 
    nickname: string, 
    email: string, 
    password: string, 
    birthdate:string, 
    gender:string, 
    city:string
  ){
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const uid = userCredential.user.uid;

      // Guardar en Firestore
      await setDoc(doc(this.firestore, 'usuarios', uid), {
        nombre: name,
        apellidos: lastname,
        nickname: nickname, 
        email: email,
        birthdate: birthdate,
        gender: gender,
        city: city,
        uid: uid,
        
        creado: new Date()
      });

      return uid;
    } catch (error) {
      console.error('Error en el registro:', error);
      throw error;
    }
  }

  // Login
  async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.router.navigate(['/dashboard']);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

  // Obtener usuario actual
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
  // Eliminar cuenta
  async deleteAccount(): Promise<void> {
    const user = this.getCurrentUser();
    if (user) {
      try {
        // Eliminar documento de Firestore
        await setDoc(doc(this.firestore, 'usuarios', user.uid), {}, { merge: true });
        // Cerrar sesión
        await signOut(this.auth);
        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Error al eliminar la cuenta:', error);
        throw error;
      }
    } else {
      console.warn('No hay usuario autenticado para eliminar la cuenta.');
    }
  }
}
