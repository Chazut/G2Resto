import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Restaurant } from '../models/Restaurant.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  //Tableau contenant les restaurants
  restaurants: Restaurant[] = [];
  //Subject = emetteur de données, permet de les récuperer ailleurs
  restaurantsSubject = new Subject<Restaurant[]>();

  constructor() { }

  //Méthode de création d'un nouveau restaurant
  createRestaurant(newRestaurant : Restaurant){
    this.restaurants.push(newRestaurant);
    this.saveRestaurants();
    this.emitRestaurants();
  }

  //Méthode de suppression d'un restaurant
  removeRestaurant(restaurant: Restaurant){
    //TODO
  }

  //Méthode d'emission des données
  emitRestaurants() {
    this.restaurantsSubject.next(this.restaurants);
  }

  //Méthode d'enregistrement dans firebase
  saveRestaurants(){
    firebase.database().ref('/restaurants').set(this.restaurants);
  }

}
