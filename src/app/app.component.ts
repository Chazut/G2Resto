import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){
    //Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyAbmHC0gyaFCPYawSv91B8-Vf9-_5ahfb0",
      authDomain: "g2resto-2e83d.firebaseapp.com",
      databaseURL: "https://g2resto-2e83d.firebaseio.com",
      projectId: "g2resto-2e83d",
      storageBucket: "",
      messagingSenderId: "385978229022",
      appId: "1:385978229022:web:58288b2c5b1c1385"
    };
    //Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
