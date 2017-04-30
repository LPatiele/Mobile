import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { FotoService } from '../../providers/foto-service';
import { PerfilService } from '../../providers/perfil-service';
import firebase from 'firebase';



@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class Feed {


  constructor(public navCtrl: NavController, public navParams: NavParams, public perfilService: PerfilService, public fotoService: FotoService, public menuCtrl: MenuController) {
    this.menuCtrl.enable(true, 'menu2');
    // this.perfilService.setImgPerfil();
    this.perfilService.setDataPerfil();
  }



}
