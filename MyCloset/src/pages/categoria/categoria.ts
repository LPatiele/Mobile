import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FotoService } from '../../providers/foto-service';
import { PerfilService } from '../../providers/perfil-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';

@Component({
  selector: 'page-categoria',
  templateUrl: 'categoria.html',
})
export class Categoria {
  id: any;
  idRUser: any;
  idRCtg: any;
  nome: any;
  closetID: any;
  roupas: FirebaseListObservable<any>;
  refPecasCatg: any;

  constructor(af: AngularFire, public perfilService: PerfilService, public fotoService: FotoService, public navCtrl: NavController, public navParams: NavParams) {
    this.id = navParams.get('id');
    this.nome = navParams.get('nome');
    this.closetID = navParams.get('closet');
    this.idRUser = navParams.get('idRoupas')
    this.perfilService.setDataPerfil();
    console.log('categoria id :  '+this.id);
    console.log('categoria nome:  '+this.nome);
    console.log('closet id :  '+this.closetID);
    console.log('roupas id de usuario:  '+this.idRUser);

    var self = this;
    firebase.database().ref('closets/' + self.closetID + '/categorias').child(self.id).once('value', (snapshot: any) => {
      self.idRCtg = snapshot.val().idRoupas;
      console.log('roupas id de categoria:  '+this.idRCtg);

      this.roupas = af.database.list('/roupas/' + self.idRUser + '/' + self.idRCtg+'/pecas');
      self.refPecasCatg = firebase.database().ref('/roupas/' + self.idRUser + '/' + self.idRCtg +'/pecas');
      console.log('referencia pra salvar peças:'+this.refPecasCatg.toString());
    });



  }

  addRoupas() {
   this.fotoService.goRoupa(this.refPecasCatg);
  }


}
