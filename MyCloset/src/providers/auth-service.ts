import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class AuthService {

  public fireAuth: any;
  public userData: any;

  constructor(public http: Http) {
    console.log('Hello AuthService Provider');
    this.fireAuth = firebase.auth();
    this.userData = firebase.database().ref('/userData');
  }

  // function for login
  doLogin(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  //function for the register
  register(email: string, password: string): any {
  return this.fireAuth.createUserWithEmailAndPassword(email, password)
    .then((newUser) => {
      this.userData.child(newUser.uid).set({email: email});
    });
  }

  //function for reset password
  resetPassword(email: string): any {
  return this.fireAuth.sendPasswordResetEmail(email);
  }

  //function for logout from firebase
  doLogout(): any {
  return this.fireAuth.signOut();
  }

}
