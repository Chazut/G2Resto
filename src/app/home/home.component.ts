import { Component, OnInit, OnDestroy } from '@angular/core';
import { Restaurant } from '../models/Restaurant.model';
import { Subscription } from 'rxjs';
import { RestaurantsService } from '../services/restaurants.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  restaurants: Restaurant[];
  restaurantsSubscription : Subscription;

  constructor(private restaurantsService : RestaurantsService, private router: Router) { }

  ngOnInit() {
    this.restaurantsSubscription = this.restaurantsService.restaurantsSubject.subscribe(
      (restaurants: Restaurant[]) => {
        this.restaurants = restaurants;
      }
    );
    this.restaurantsService.getRestaurants();
    this.restaurantsService.emitRestaurants();
  }

  ngOnDestroy() {
    this.restaurantsSubscription.unsubscribe();
  }

  onViewMenu(id: number){
    this.router.navigate(['/restaurant/', id]);
  }

}
