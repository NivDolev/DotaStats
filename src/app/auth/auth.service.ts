import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  signupUser(email: string, password: string) {
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then(
        msg => console.log(`Sign up successful: ${msg}`)
      )
      .catch(
        err => console.log(err)
      );
  }
}
