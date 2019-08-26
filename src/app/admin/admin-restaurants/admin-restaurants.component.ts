import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { Restaurant } from 'src/app/models/Restaurant.model';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-restaurants',
  templateUrl: './admin-restaurants.component.html',
  styleUrls: ['./admin-restaurants.component.css']
})
export class AdminRestaurantsComponent implements OnInit, OnDestroy {

  restaurantForm: FormGroup;
  restaurantSubscription: Subscription;
  restaurants: Restaurant[];
  editRestaurant: boolean = false;
  fileUploading: boolean = false;
  fileUploaded: boolean = false;
  fileURL: string;

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
      description: ['']
    })
  }

  resetForm(){
    this.editRestaurant = false;
    this.restaurantForm.reset();
    this.fileUploaded = false;
    this.fileUploading = false;
  }

  onSave(){
    const id = this.restaurantForm.get('id').value;
    const nom = this.restaurantForm.get('nom').value;
    const adresse = this.restaurantForm.get('adresse').value;
    const telephone = this.restaurantForm.get('telephone').value;
    const description = this.restaurantForm.get('description').value;
    const newRestaurant = new Restaurant(nom, adresse, telephone, description);
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
    this.restaurantForm.get('description').setValue(restaurant.description);
    this.editRestaurant = true;
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
