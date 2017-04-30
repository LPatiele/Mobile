import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class AuthService {

  public fireAuth: any;
  public userData: any;

  constructor(public http: Http) {
    this.fireAuth = firebase.auth();
    this.userData = firebase.database().ref('/userData/');
  }

  // function for login
  doLogin(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  //function for the register
  register(email: string, password: string, username: string): any {
  return this.fireAuth.createUserWithEmailAndPassword(email, password)
    .then((newUser) => {
      this.userData.child(newUser.uid).set({
        email: email,
        username: username,
        amigo: null,
        // gp:
        nome: username,
        url: "https://firebasestorage.googleapis.com/v0/b/mycloset-45165.appspot.com/o/appDefault%2Fb.jpg?alt=media&token=4967bcf8-2e4e-4556-80a9-d62d72dd5072",
        imgNome:"default.jpg",
        ultimaAtualizacao: new Date().getTime()
        // place:
      });
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
