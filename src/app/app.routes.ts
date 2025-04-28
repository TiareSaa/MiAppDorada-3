import { Routes } from '@angular/router';

export const routes: Routes = [
  // Rutas principales
  { path: 'home', loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage) },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.page').then((m) => m.DashboardPage) },

  // Rutas de funcionalidades
  { path: 'calendario', loadComponent: () => import('./pages/calendario/calendario.page').then((m) => m.CalendarioPage) },
  { path: 'medicamentos', loadComponent: () => import('./pages/medicamentos/medicamentos.page').then((m) => m.MedicamentosPage) },
  { path: 'panoramas', loadComponent: () => import('./pages/panoramas/panoramas.page').then((m) => m.PanoramasPage) },
  { path: 'contactos', loadComponent: () => import('./pages/contactos/contactos.page').then((m) => m.ContactosPage) },
  { path: 'consejos', loadComponent: () => import('./pages/consejos/consejos.page').then((m) => m.ConsejosPage) },
  { path: 'panic', loadComponent: () => import('./pages/panic/panic.page').then((m) => m.PanicPage) },

  // Rutas secundarias
  { path: 'register', loadComponent: () => import('./pages/register/register.page').then((m) => m.RegisterPage) },
  
];
