import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class AuthService {

  public fireAuth: any;
  private userData: any;
  private closets: any;
  private idCloset: any;
  private categorias: any;
  public categoriasId: any

  constructor(public http: Http) {
    this.fireAuth = firebase.auth();
    this.userData = firebase.database().ref('/userData/');
    this.closets = firebase.database().ref('/closets/');
    this.categorias = firebase.database().ref('/categorias/');
  }

  // function for login
  doLogin(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  //function for the register
  register(email: string, password: string, username: string): any {

  return this.fireAuth.createUserWithEmailAndPassword(email, password)
    .then((newUser) => {

      this.idCloset = this.closets.push({ user: newUser.uid}).key;
      this.categoriasId = this.categorias.push({closet: this.idCloset}).key;
      this.userData.child(newUser.uid).set({
        email: email,
        username: username,
        amigo: null,
        // gp:
        nome: username,
        url: "https://firebasestorage.googleapis.com/v0/b/mycloset-45165.appspot.com/o/appDefault%2Fb.jpg?alt=media&token=4967bcf8-2e4e-4556-80a9-d62d72dd5072",
        imgNome:"default.jpg",
        closet: this.idCloset
        // place:
      })
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
