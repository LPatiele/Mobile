import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { PerfilService } from '../../providers/perfil-service';
import { FotoService } from '../../providers/foto-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';

@Component({
  selector: 'page-hair',
  templateUrl: 'hair.html',
})
export class Hair {
  ref: any;
  hairs: FirebaseListObservable<any>;
  constructor( public fotoService: FotoService, af: AngularFire,public perfilService: PerfilService, public navCtrl: NavController, public navParams: NavParams) {
    this.perfilService.setDataPerfil();
    this.ref= firebase.database().ref('/hair/'+ firebase.auth().currentUser.uid );
    this.hairs = af.database.list('/hair/' + firebase.auth().currentUser.uid );
}

addHair() {
  var titulo='Adicionar novo look';
  var local= 'hair/'+firebase.auth().currentUser.uid+ '/' ;
  this.fotoService.goFoto(titulo,this.ref,local);
}

}
