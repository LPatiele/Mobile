import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { PerfilService } from '../../providers/perfil-service';
import { FotoService } from '../../providers/foto-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';

@Component({
  selector: 'page-make',
  templateUrl: 'make.html',
})
export class Make {
  ref: any;
  makes: FirebaseListObservable<any>;
  constructor( public fotoService: FotoService, af: AngularFire,public perfilService: PerfilService, public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams) {
    this.menuCtrl.enable(true, 'menu2');
    this.perfilService.setDataPerfil();
    this.ref= firebase.database().ref('/makes' );
    this.makes = af.database.list('/makes' );
}

addMake() {
  var titulo='Adicionar nova maquiagem';
  var local= 'makes/';
  this.fotoService.goFoto(titulo,this.ref,local);
}

}
