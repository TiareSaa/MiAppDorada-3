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
    private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

async onSubmit() {
  this.submitted = true;
  if (this.registerForm.valid && this.passwordsMatch()) {
    const { name, email, password } = this.registerForm.value;
    try {
      await this.authService.register(name, email, password);
      this.router.navigateByUrl('/dashboard');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  }
}
  passwordsMatch(): boolean {
    return this.registerForm.value.password === this.registerForm.value.confirmPassword;
  }
}

