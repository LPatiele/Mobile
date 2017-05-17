import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { PerfilService } from '../../providers/perfil-service';
import { FotoService } from '../../providers/foto-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';
import { Perfil } from '../perfil/perfil';



@Component({
  selector: 'page-look',
  templateUrl: 'look.html',
})
export class Look {

ref: any;
user:any;
looks: FirebaseListObservable<any>;//equivale a songs

  constructor( public fotoService: FotoService, af: AngularFire,public perfilService: PerfilService, public navCtrl: NavController, public navParams: NavParams) {
    this.perfilService.setDataPerfil();
    this.ref= firebase.database().ref('/looks' );
    this.looks = af.database.list('/looks' );
    this.user= firebase.auth().currentUser.uid;

  }

  // criar os looks e add as peças q fazem parte do look

  addLook() {
    var titulo='Adicionar novo look';
    var local= 'looks/' ;
    this.fotoService.goFoto(titulo,this.ref,local);
  }

}
