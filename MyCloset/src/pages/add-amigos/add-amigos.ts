import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { PerfilService } from '../../providers/perfil-service';

@Component({
  selector: 'page-add-amigos',
  templateUrl: 'add-amigos.html',
})
export class AddAmigos {

  usuarios: FirebaseListObservable<any>;
 solicitacao: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public af: AngularFire, public perfilService: PerfilService, public navParams: NavParams) {
    this.perfilService.setDataPerfil();
    this.usuarios = af.database.list('/userData');
    this.solicitacao = af.database.list('/userData');
  }

solicitarAmizade(amigoUid){

}
aceitarSolicitacao(){

}
}
