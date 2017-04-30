import { Component } from '@angular/core';
import {AngularFire} from 'angularfire2';
import { NavController} from 'ionic-angular';
import { Login } from '../login/login';
import { Feed } from '../feed/feed';
import firebase from 'firebase';








@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {


  constructor( public navCtrl: NavController) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        navCtrl.setRoot(Login);
      }else{
        navCtrl.setRoot(Feed);
      }
    });
  }






}
