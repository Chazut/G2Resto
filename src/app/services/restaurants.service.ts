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
    const index = this.restaurants.findIndex(
      (restaurantElement) => {
        if(restaurantElement == restaurant){
          return true;
        }
      }
    );
    this.restaurants.splice(index, 1);
    this.saveRestaurants();
    this.emitRestaurants();
  }

  //Méthode d'emission des données
  emitRestaurants() {
    this.restaurantsSubject.next(this.restaurants);
  }

  //Méthode d'enregistrement dans firebase
  saveRestaurants(){
    firebase.database().ref('/restaurants').set(this.restaurants);
  }

  getRestaurants(){
    firebase.database().ref('restaurants').on('value', (data) =>{
      this.restaurants = data.val() ? data.val() : [];
      this.emitRestaurants();
    });
  }

  getRestaurant(id: number){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/restaurants/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  updateRestaurant(restaurant: Restaurant, id: number){
    firebase.database().ref('/restaurants/' + id).update(restaurant); 
  }

  uploadFile(file: File, path: string){
    return new Promise(
      (resolve, reject) => {
        const upload = firebase.storage().ref().child(path + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
          },
          (error) => {
            console.log('Error: ' + error);
            reject();
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then(function(downloadURL){
              resolve(downloadURL);
            })
          });
      }
    );
  }

  removeFile(link: string){
    if(link){
      const storageRef = firebase.storage().refFromURL(link);
      storageRef.delete().then(
        () => {
        }
      ).catch(
        (error) => {
          console.log("file not found: " + error);
        }
      );
    }
  }

}
