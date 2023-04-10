import { Routes } from '@angular/router';
export const APP_ROUTES: Routes = [
  // {path: '', redirectTo: '/user/login', pathMatch: 'full'},
  {path: 'user', loadChildren: () => import('./user/user.routes').then(m => m.USER_ROUTES)},
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)},
]
