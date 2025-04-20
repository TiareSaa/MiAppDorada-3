import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'calendario',
    loadComponent: () => import('./calendario/calendario.page').then( m => m.CalendarioPage)
  },
  {
    path: 'medicamentos',
    loadComponent: () => import('./medicamentos/medicamentos.page').then( m => m.MedicamentosPage)
  },
  {
    path: 'panoramas',
    loadComponent: () => import('./panoramas/panoramas.page').then( m => m.PanoramasPage)
  },
  {
    path: 'contactos',
    loadComponent: () => import('./contactos/contactos.page').then( m => m.ContactosPage)
  },
  {
    path: 'consejos',
    loadComponent: () => import('./consejos/consejos.page').then( m => m.ConsejosPage)
  },
  {
    path: 'panic',
    loadComponent: () => import('./panic/panic.page').then( m => m.PanicPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
];
