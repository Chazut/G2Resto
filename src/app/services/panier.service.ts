import { Injectable } from '@angular/core';
import { Panier } from '../models/Panier.model';
import { Subject, empty } from 'rxjs';
import { Plat } from '../models/Plat.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class PanierService {

  paniers: Panier[] = [];
  panier: Panier;

  paniersSubject = new Subject<Panier[]>();
  panierSubject = new Subject<Panier>();

  constructor() { }

  addToPanier(plat : Plat){
    if(this.panier == undefined || this.panier == null){
      this.panier = new Panier();
      this.panier.plats = [plat];
    } else {
      if(this.panier.plats == undefined){
        this.panier.plats = [plat];
      } else {
        this.panier.plats.push(plat);
      }
    }
    this.emitPanier();
  }

  removeFromPanier(plat: Plat){
    const index = this.panier.plats.findIndex(
      (platElement) => {
        if(platElement == plat){
          return true;
        }
      }
    );
    this.panier.plats.splice(index, 1);
    this.emitPanier();
  }

  getPaniers(){
    firebase.database().ref('paniers').on('value', (data) =>{
      this.paniers = data.val() ? data.val() : [];
      this.emitPanier();
    });
  }

  getPanier(){
    return this.panier;
  }

  emitPanier() {
    this.panierSubject.next(this.panier);
    this.paniersSubject.next(this.paniers);
  }

  savePanier(newPanier: Panier){
    this.getPaniers();
    this.paniers.push(newPanier);
    this.panier = null;
    firebase.database().ref('/paniers').set(this.paniers);
  }

  updatePaniers(panier: Panier){
    firebase.database().ref('/paniers').set(this.paniers);
  }

  setDone(panier: Panier){
    const index = this.paniers.findIndex(
      (panierElement) => {
        if(panierElement == panier){
          return true;
        }
      }
    );
    this.paniers[index].done = true;
    this.emitPanier();
    this.updatePaniers(panier);
  }

}
