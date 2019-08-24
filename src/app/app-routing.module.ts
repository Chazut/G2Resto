import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminRestaurantsComponent } from './admin/admin-restaurants/admin-restaurants.component';

const routes: Routes = [
  { path: 'connexion', component: SigninComponent },
  { path : 'dashboard', component: AdminDashboardComponent },
  { path : 'addRestaurant', component: AdminRestaurantsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
