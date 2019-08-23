import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logged: boolean;
  loggedAsAdmin: boolean;

  constructor(private authentificationService: AuthenticationService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user){
          this.logged = true;
          if(user.email == "admin@gmail.com"){
            this.loggedAsAdmin = true;
          } else {
            this.loggedAsAdmin = false;
          }
        } else {
          this.logged = false;
        }
      }
    );
  }

  onSignout() {
    this.authentificationService.signout();
  }

}
