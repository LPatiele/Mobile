import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PerfilService } from '../../providers/perfil-service';
import { Perfil } from '../perfil/perfil';

@Component({
  selector: 'page-seguidores',
  templateUrl: 'seguidores.html',
})
export class Seguidores {

  constructor(public navCtrl: NavController, public perfilService: PerfilService, public navParams: NavParams) {
    this.perfilService.setDataPerfil();
}


}
