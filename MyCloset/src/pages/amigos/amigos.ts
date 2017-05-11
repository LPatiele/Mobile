import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { AddAmigos } from '../add-amigos/add-amigos';
import { MeusAmigos } from '../meus-amigos/meus-amigos';


@Component({
  selector: 'page-amigos',
  templateUrl: 'amigos.html',
})
export class Amigos {

  tab1Root: any;
  tab2Root: any;


usuarios: FirebaseListObservable<any>;
amigos: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,public af: AngularFire, public navParams: NavParams) {
    this.tab1Root = AddAmigos;
    this.tab2Root = MeusAmigos;
  }



}
