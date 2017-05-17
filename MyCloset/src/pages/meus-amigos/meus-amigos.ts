import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { PerfilService } from '../../providers/perfil-service';
import { Perfil } from '../perfil/perfil';

@Component({
  selector: 'page-meus-amigos',
  templateUrl: 'meus-amigos.html',
})
export class MeusAmigos {

  usuarios: FirebaseListObservable<any>;
  amigos: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController,public perfilService: PerfilService, public navParams: NavParams) {
    this.perfilService.setDataPerfil();
}

}
