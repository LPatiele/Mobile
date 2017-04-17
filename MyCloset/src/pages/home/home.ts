import { Component } from '@angular/core';
import { NavController, } from 'ionic-angular';
import { Login } from '../login/login';
import firebase from 'firebase';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})



export class HomePage {

  constructor(public navCtrl: NavController, public authService: AuthService) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
      navCtrl.setRoot(Login);
      }
    });
  }

  logout() {
  this.authService.doLogout();
}

}
