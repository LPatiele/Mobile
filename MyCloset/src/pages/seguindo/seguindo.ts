import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PerfilService } from '../../providers/perfil-service';
import { Perfil } from '../perfil/perfil';

@Component({
  selector: 'page-seguindo',
  templateUrl: 'seguindo.html',
})
export class Seguindo {

  constructor( public perfilService: PerfilService, public navCtrl: NavController, public navParams: NavParams) {
    this.perfilService.setDataPerfil();

  }



}
