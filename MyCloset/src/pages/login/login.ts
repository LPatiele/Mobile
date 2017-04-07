import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';


@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})

export class LoginPage{

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {

  }
}
