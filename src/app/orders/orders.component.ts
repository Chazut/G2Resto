import { Component, OnInit, OnDestroy } from '@angular/core';
import { Panier } from '../models/Panier.model';
import { Subscription } from 'rxjs';
import { PanierService } from '../services/panier.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

  paniers: Panier[];
  paniersSubscription: Subscription;
  owner: string;
  ownerHasPanier: boolean = false;

  constructor(private panierService: PanierService) { }

  ngOnInit() {
    this.paniersSubscription = this.panierService.paniersSubject.subscribe(
      (paniers: Panier[]) => {
        this.paniers = paniers;
      }
    );
    this.panierService.getPaniers();
    this.panierService.emitPanier();
    if(firebase.auth().currentUser == null){
      this.owner = "";
    } else {
      this.owner = firebase.auth().currentUser.email;
    }
    this.ownerHasPanier = false;
    this.checkIfOwnerHasPanier();
  }

  ngOnDestroy() {
    this.paniersSubscription.unsubscribe();
  }

  checkIfOwnerHasPanier(){
    this.paniers.forEach(panier => {
      if(panier.owner == this.owner){
        this.ownerHasPanier = true;
        return;
      }
    });
  }

}
