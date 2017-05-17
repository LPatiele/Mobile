import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
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

ref:any;

  looks: FirebaseListObservable<any>;//equivale a songs

  constructor( public fotoService: FotoService, af: AngularFire,public perfilService: PerfilService, public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams) {
    this.menuCtrl.enable(true, 'menu2');
    this.perfilService.setDataPerfil();
    this.ref= firebase.database().ref('/looks/'+ firebase.auth().currentUser.uid );
    this.looks = af.database.list('/looks/' + firebase.auth().currentUser.uid );


  }

  // criar os looks e add as peças q fazem parte do look

  addLook() {
    var titulo='Adicionar novo look';
    var local= 'looks/'+firebase.auth().currentUser.uid;
    this.fotoService.goFoto(titulo,this.ref,local);
  }

}
