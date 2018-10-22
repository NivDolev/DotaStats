import { Injectable, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  constructor(private router: Router) { }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        response => {
          this.router.navigate(['/']);
          console.log(`Sign up successful: ${response}`);
        }
      )
      .catch(
        err => console.log(err)
      );
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          console.log(`Sign in successful: ${response}`);
          this.router.navigate(['/']);
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            );
        }
      )
      .catch(
        err => console.log(err)
      );
  }

  getToken() {

  }

  isAuthenticated(): boolean {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }
}
