import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { PerfilService } from '../../providers/perfil-service';

@Component({
  selector: 'page-amigos',
  templateUrl: 'amigos.html',
})
export class Amigos {

usuarios: FirebaseListObservable<any>;
amigos: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,public af: AngularFire, public perfilService: PerfilService, public navParams: NavParams) {
    this.usuarios = af.database.list('/userData');
    this.perfilService.setDataPerfil();
  }



}
