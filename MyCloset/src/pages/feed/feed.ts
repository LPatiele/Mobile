import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FotoService } from '../../providers/foto-service';
import { PerfilService } from '../../providers/perfil-service';
import firebase from 'firebase';
import { Perfil } from '../perfil/perfil';
import { AngularFire, FirebaseListObservable } from 'angularfire2';




@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class Feed {

looks: FirebaseListObservable<any>;
users: FirebaseListObservable<any>;

  constructor( af: AngularFire,public navCtrl: NavController, public navParams: NavParams, public perfilService: PerfilService, public fotoService: FotoService) {
    this.perfilService.setDataPerfil();
    this.looks = af.database.list('/looks');
    this.users= af.database.list('/userData');
    console.log(this.looks);
  }

goPerfil(){
  this.navCtrl.push(Perfil);
}


}
