import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { Restaurant } from 'src/app/models/Restaurant.model';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-restaurants',
  templateUrl: './admin-restaurants.component.html',
  styleUrls: ['./admin-restaurants.component.css']
})
export class AdminRestaurantsComponent implements OnInit {

  restaurantForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private restaurantService: RestaurantsService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.restaurantForm = this.formBuilder.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/[0-9]{10,10}/)]],
      description: ['']
    })
  }

  onSave(){
    const nom = this.restaurantForm.get('nom').value;
    const adresse = this.restaurantForm.get('adresse').value;
    const telephone = this.restaurantForm.get('telephone').value;
    const description = this.restaurantForm.get('description').value;
    const newRestaurant = new Restaurant(nom, adresse, telephone, description);
    this.restaurantService.createRestaurant(newRestaurant);
    $('#restaurantModal').modal('hide');
    this.restaurantForm.reset();
  }

}
