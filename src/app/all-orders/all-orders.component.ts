import { Component, OnInit } from '@angular/core';
import { Panier } from '../models/Panier.model';
import { Subscription } from 'rxjs';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  paniers: Panier[];
  paniersSubscription: Subscription;

  constructor(private panierService: PanierService) { }

  ngOnInit() {
    this.paniersSubscription = this.panierService.paniersSubject.subscribe(
      (paniers: Panier[]) => {
        this.paniers = paniers;
      }
    );
    this.panierService.getPaniers();
    this.panierService.emitPanier();
  }

  finaliserCommande(panier: Panier){
    this.panierService.setDone(panier);
  }

}
