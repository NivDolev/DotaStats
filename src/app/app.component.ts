import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBcEwL20RIemmDamk1ZGpUd56qw_W5sYes',
    authDomain: 'my-dota-stats.firebaseapp.com'
    });
  }
}
