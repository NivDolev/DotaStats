import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import * as firebase from 'firebase';
import swal from 'sweetalert';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {
  token: string;
  isAuth: boolean;
  tokenChange: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router) { }

  ngOnInit() { }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        response => {
          swal({
            title: 'Sign in successful!',
            text: 'navigating home',
            icon: 'success',
          }).then(
            (val) => this.router.navigate(['/'])
          );
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) =>  {
                this.token = token;
                this.isAuth = true;
                this.tokenChange.next(this.isAuth);
              }
            );
        }
      )
      .catch(
        (err: Error) => {
          swal({
            title: 'Something went wrong',
            text: err.message,
            icon: 'error'
          });
        }
      );
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          swal({
            title: 'Sign in successful!',
            text: 'navigating home',
            icon: 'success',
          }).then(
            (val) => this.router.navigate(['/'])
          );
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) =>  {
                this.token = token;
                this.isAuth = true;
                this.tokenChange.next(this.isAuth);
              }
            );
        }
      )
      .catch(
        (err: Error) => {
          swal({
            title: 'Something went wrong',
            text: err.message,
            icon: 'error'
          });
        }
      );
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
    this.isAuth = false;
    this.tokenChange.next(this.isAuth);
    swal({
      title: 'Logout successful!',
      text: 'navigating home',
      icon: 'success',
    }).then(
      (val) => this.router.navigate(['/'])
    );
  }
}
