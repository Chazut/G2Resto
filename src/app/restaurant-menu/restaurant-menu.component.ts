import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../models/Restaurant.model';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from '../services/restaurants.service';
import { Plat } from '../models/Plat.model';
import { PanierService } from '../services/panier.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.css']
})
export class RestaurantMenuComponent implements OnInit {

  restaurant: Restaurant;

  constructor(private route: ActivatedRoute, private restaurantsService: RestaurantsService, private panierService: PanierService) { }

  ngOnInit() {
    this.restaurant = new Restaurant('','','','', '');
    const id = this.route.snapshot.params['id'];
    this.restaurantsService.getRestaurant(+id).then(
      (restaurant: Restaurant) => {
        this.restaurant = restaurant; 
      }
    );
  }

  onAddingToCart(id: number){
    if(firebase.auth().currentUser != null){
      const plat = this.restaurant.plats[id];
      this.panierService.addToPanier(plat);
    }
  }

}
