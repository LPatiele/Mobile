import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from './user';
import firebase from 'firebase';


@Injectable()
export class DataService {

  public fireAuth: any;
  public userData: any;
  private user: User;

  constructor(public http: Http) {
    console.log('Hello DataService Provider');
    // this.fireAuth = firebase.auth();
    // this.userData = firebase.database().ref('/userData');
    // this.user.url = fireAuth.currentUser.url;
  }

  getUserData(){
  //   var name, email, photoUrl, uid;
  //   if ( firebase.auth().currentUser != null) {
  // this.user.name = firebase.auth().currentUser.name;
  // this.user.email = firebase.auth().currentUser.email;
  // this.user.url = firebase.auth().currentUser.url;
  // this.user.uid = firebase.auth().currentUser.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                   // this value to authenticate with your backend server, if
                   // you have one. Use User.getToken() instead.
}

  // writeUserData(email: string, password: string, username: string): any {
  //     this.userData.child(this.fireAuth.uid).set({
  //       email: email,
  //       username: username,
  //       teste: "Q cu"
  //     });
  //   }

    //trocar foto do usuario
  }
