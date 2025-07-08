import { ToastController } from '@ionic/angular';
// src/pages/register/register.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, // Asegúrate de que AuthService esté importado correctamente
    private toastController: ToastController,
    private router: Router) {
  
this.registerForm = this.fb.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    nickname: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    birthdate: ['', Validators.required],
    gender: [''],
    city: [''],
});
    
  }

async onSubmit() {
  this.submitted = true;

  if (this.registerForm.invalid || !this.passwordsMatch()) {
    return;
  }

  const { name, lastname, nickname, email, password, birthdate, gender, city } = this.registerForm.value;

  try {
    await this.authService.register(name, lastname, nickname, email, password, birthdate, gender, city);

    const toast = await this.toastController.create({
      message: 'Usuario registrado exitosamente. Inicia sesión.',
      duration: 4500,
      color: 'success',
      position: 'middle',
    });
    await toast.present();  

    this.registerForm.reset(); // Limpia el formulario
    this.submitted = false;

    this.router.navigate(['/login']); // Redirige al login

    

  } catch (error:any) {
    let message = 'Error al registrar usuario.';
    
  if (error.code === 'auth/weak-password') {
    message = 'La contraseña debe tener al menos 6 caracteres.';
  } else if (error.code === 'auth/email-already-in-use') {
    message = 'Este correo ya está registrado. Intenta iniciar sesión.';
  } else if (error.code === 'auth/invalid-email') {
    message = 'El correo electrónico no es válido.';
  }
    
    const toast = await this.toastController.create({
      message: message,
      duration: 4500,
      color: 'danger',
      position: 'middle',
    });
    await toast.present();
    this.registerForm.reset(); // Limpia el formulario
    this.submitted = false;
  }
}
  passwordsMatch(): boolean {
    return this.registerForm.value.password === this.registerForm.value.confirmPassword;
  }
}

