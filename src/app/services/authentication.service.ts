import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  signinUser(email: string, password: string){
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
            console.log('Connecté');
          },
          (error) => { reject(error);}
        );
      }
    );
  }

  signout(){
    firebase.auth().signOut();
  }

}
