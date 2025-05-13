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
  { path: 'actividades', loadComponent: () => import('./pages/actividades/actividades.page').then((m) => m.ActividadesPage) },
  { path: 'actividad-detalle/:categoria', loadComponent: () => import('./pages/actividad-detalle/actividad-detalle.page').then((m) => m.ActividadDetallePage) },
  { path: 'actividad-guia/:id', loadComponent: () => import('./pages/actividad-guia/actividad-guia.page').then((m) => m.ActividadGuiaPage) },
  { path: 'consejos', loadComponent: () => import('./pages/consejos/consejos.page').then((m) => m.ConsejosPage) },
  { path: 'panic', loadComponent: () => import('./pages/panic/panic.page').then((m) => m.PanicPage) },
  { path: 'consejos-detalle/:categoria', loadComponent: () => import('./pages/consejos-detalle/consejos-detalle.page').then((m) => m.ConsejosDetallePage) },
  { path: 'consejos-guia/:id', loadComponent: () => import('./pages/consejos-guia/consejos-guia.page').then((m) => m.ConsejosGuiaPage) },

  // Rutas secundarias
  { path: 'register', loadComponent: () => import('./pages/register/register.page').then((m) => m.RegisterPage) },
  
];
