import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from './gardes/admin.guard';
import { GardGuard } from './gardes/gard.guard';
import { HomeComponent } from './home/home.component';
import { LivreComponent } from './livre/livre.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AdminGuard, GardGuard],
  },
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [GardGuard] },
  { path: 'livre/:id', component: LivreComponent, canActivate: [GardGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
