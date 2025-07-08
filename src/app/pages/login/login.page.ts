import { AuthService } from './../../services/auth.service';
// src/pages/login/login.page.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm!: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private authservice: AuthService,
    private toastcontroller: ToastController,
  ) {}

  loginExitoso = false;
  
  async login() {
    try {
      await this.authservice.login(this.email?.value, this.password?.value);
      this.loading = false;
      this.router.navigateByUrl('/dashboard');
      this.onReset();
    } catch (error) {
      this.loading = false;
      const toast = await this.toastcontroller.create({
        message: 'Correo o contraseña incorrectos',
        duration: 2000,
        color: 'danger',
      });
      toast.present();
    }
  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.login();
  }
  onReset() {
    this.submitted = false;
    this.loginForm.reset();
  }
}
