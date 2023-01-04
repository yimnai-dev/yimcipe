import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/user/verify', pathMatch: 'full'},
  {path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
  {path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
