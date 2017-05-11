import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { PerfilService } from '../../providers/perfil-service';
import { Seguindo } from '../seguindo/seguindo';
import { Seguidores } from '../seguidores/seguidores';

@Component({
  selector: 'page-seguir',
  templateUrl: 'seguir.html',
})
export class Seguir {
  tab3Root: any;
  tab4Root: any;

  constructor(public navCtrl: NavController,public af: AngularFire, public navParams: NavParams) {
    this.tab3Root = Seguindo;
    this.tab4Root = Seguidores;
  }


}
