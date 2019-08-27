import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { Restaurant } from 'src/app/models/Restaurant.model';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { Plat } from 'src/app/models/Plat.model';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-admin-restaurants',
  templateUrl: './admin-restaurants.component.html',
  styleUrls: ['./admin-restaurants.component.css']
})
export class AdminRestaurantsComponent implements OnInit, OnDestroy {

  restaurantForm: FormGroup;
  platForm: FormGroup;
  restaurantSubscription: Subscription;
  restaurants: Restaurant[];
  editRestaurant: boolean = false;
  fileUploading: boolean = false;
  fileUploaded: boolean = false;
  fileURL: string;
  currentID: number;
  restaurant: Restaurant;

  constructor(private formBuilder: FormBuilder, private restaurantService: RestaurantsService) { }

  ngOnInit() {
    this.initForm();
    this.restaurantSubscription = this.restaurantService.restaurantsSubject.subscribe(
      (restaurants: Restaurant[]) => {
        this.restaurants = restaurants;
      }
    );
    this.restaurantService.getRestaurants();
  }

  ngOnDestroy(){
    this.restaurantSubscription.unsubscribe();
  }

  initForm(){
    this.restaurantForm = this.formBuilder.group({
      id: [''],
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/[0-9]{10,10}/)]],
      foodtype: ['', Validators.required],
      description: ['']
    })
    this.platForm = this.formBuilder.group({
      nom_plat: ['', Validators.required],
      type_plat: ['', Validators.required],
      prix: ['', Validators.required],
      description_plat: ['']
    })
  }

  resetForm(){
    this.editRestaurant = false;
    this.restaurantForm.reset();
    this.platForm.reset();
    this.fileUploaded = false;
    this.fileUploading = false;
  }

  onSave(){
    const id = this.restaurantForm.get('id').value;
    const nom = this.restaurantForm.get('nom').value;
    const adresse = this.restaurantForm.get('adresse').value;
    const telephone = this.restaurantForm.get('telephone').value;
    const foodtype = this.restaurantForm.get('foodtype').value;
    const description = this.restaurantForm.get('description').value;
    const newRestaurant = new Restaurant(nom, adresse, telephone, foodtype, description);
    if(this.fileURL && this.fileURL != ''){
      newRestaurant.img = this.fileURL;
    }
    if(this.editRestaurant){
      this.restaurantService.updateRestaurant(newRestaurant, id);
    } else {
      this.restaurantService.createRestaurant(newRestaurant);
    }
    $('#restaurantModal').modal('hide');
    this.resetForm();
  }

  onDelete(restaurant: Restaurant){
    this.restaurantService.removeRestaurant(restaurant);
    if(restaurant.img){
      this.restaurantService.removeFile(restaurant.img);
    }
  }

  onEdit(restaurant: Restaurant, id: number){
    $('#restaurantModal').modal('show');
    this.restaurantForm.get('id').setValue(id);
    this.restaurantForm.get('nom').setValue(restaurant.nom);
    this.restaurantForm.get('adresse').setValue(restaurant.adresse);
    this.restaurantForm.get('telephone').setValue(restaurant.telephone);
    this.restaurantForm.get('foodtype').setValue(restaurant.foodtype);
    this.restaurantForm.get('description').setValue(restaurant.description);
    this.editRestaurant = true;
  }

  onAddingPlat(){
    console.log("id given: " + this.currentID);
    const nom_plat = this.platForm.get('nom_plat').value;
    const type_plat = this.platForm.get('type_plat').value;
    const description_plat = this.platForm.get('description_plat').value;
    const prix = this.platForm.get('prix').value;
    const newPlat = new Plat(nom_plat, type_plat, description_plat, prix);
    if(this.fileURL && this.fileURL != ''){
      newPlat.img = this.fileURL;
    }
    if(this.restaurant.plats == undefined){
      const plats = [newPlat];
      this.restaurant.plats = plats;
    } else {
      const plats = this.restaurant.plats;
      plats.push(newPlat);
      this.restaurant.plats = plats;
    }
    this.restaurant.hasPlat = true;
    this.restaurantService.updateRestaurant(this.restaurant, this.currentID);
  }

  throwInfos(restaurant: Restaurant, id: number){
    this.restaurant = restaurant;
    this.currentID = id;
  }

  detectFile(event){
    this.fileUploading = true;
    this.restaurantService.uploadFile(event.target.files[0]).then(
      (url: string) => {
        this.fileURL = url;
        this.fileUploaded = true;
        this.fileUploading = false;
      }
    );
  }

}
