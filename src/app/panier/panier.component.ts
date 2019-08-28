import { Component, OnInit } from '@angular/core';
import { Plat } from '../models/Plat.model';
import { Panier } from '../models/Panier.model';
import { PanierService } from '../services/panier.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  panier: Panier
  panierSubscription: Subscription;
  prixTotal: number;
  valide: boolean = false;

  constructor(private panierService: PanierService) { }

  ngOnInit() {
    this.panierSubscription = this.panierService.panierSubject.subscribe(
      (panier: Panier) => {
        this.panier = panier;
      }
    );
    this.valide = false;
    this.panier = this.panierService.getPanier();
    this.calculTotal();
  }

  remove(plat: Plat){
    this.panierService.removeFromPanier(plat);
    this.calculTotal();
  }

  calculTotal(){
    this.prixTotal = 0;
    this.panier.plats.forEach(plat => {
      this.prixTotal = this.prixTotal + plat.prix;
    });
  }

  confirmerPanier(){
    this.panierService.savePanier(this.panier);
    this.panier = null;
    this.valide = true;
  }

}
