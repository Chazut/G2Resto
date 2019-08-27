import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../models/Restaurant.model';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from '../services/restaurants.service';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent implements OnInit {

  restaurant: Restaurant;

  constructor(private route: ActivatedRoute, private restaurantsService: RestaurantsService) { }

  ngOnInit() {
    this.restaurant = new Restaurant('','','','', '');
    const id = this.route.snapshot.params['id'];
    this.restaurantsService.getRestaurant(+id).then(
      (restaurant: Restaurant) => {
        this.restaurant = restaurant;
      }
    );
  }

}
