import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminRestaurantsComponent } from './admin/admin-restaurants/admin-restaurants.component';
import { HomeComponent } from './home/home.component';
import { RestaurantMenuComponent } from './restaurant-menu/restaurant-menu.component';
import { PanierComponent } from './panier/panier.component';
import { OrdersComponent } from './orders/orders.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';

const routes: Routes = [
  { path: 'connexion', component: SigninComponent },
  { path : 'dashboard', component: AdminDashboardComponent },
  { path : 'editRestaurants', component: AdminRestaurantsComponent },
  { path : 'restaurant/:id', component: RestaurantMenuComponent },
  { path : 'panier', component: PanierComponent },
  { path : 'orders', component: OrdersComponent },
  { path : 'allorders', component: AllOrdersComponent },
  { path : 'accueil', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
