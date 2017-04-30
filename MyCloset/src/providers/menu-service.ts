import { Injectable, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Closet } from '../pages/closet/closet';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { AuthService } from './auth-service';


import { AlertController, ActionSheetController, NavController } from 'ionic-angular';//menu1
import {AngularFire, FirebaseListObservable} from 'angularfire2';//menu1
import { Camera } from '@ionic-native/camera';
import firebase from 'firebase';


@Injectable()
export class MenuService {
  @ViewChild('mycontent') nav: NavController


  roupas: FirebaseListObservable<any>;//menu1


  constructor(public http: Http, public authService: AuthService, public alertCtrl: AlertController, public af: AngularFire, public actionSheetCtrl: ActionSheetController) {

    this.roupas = af.database.list('/roupas');

  }

  goNovidades() {
    this.nav.setRoot(HomePage);
  }


  addRoupa() {//menu1
    let prompt = this.alertCtrl.create({
      title: 'Nova Categoria',
      message: "Adicione uma nova categoria",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salvar',
          handler: data => {
            this.roupas.push({
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }


  showOptions(roupaId, roupaCategoria) {//menu1
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.removeCategoria(roupaId);
          }
        }, {
          text: 'Renomear',
          handler: () => {
            this.updateCategoria(roupaId, roupaCategoria);
          }
        }, {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  removeCategoria(roupaId: string) {//menu1
    this.roupas.remove(roupaId);
  }

  updateCategoria(roupaId, roupaCategoria) {//menu1
    let prompt = this.alertCtrl.create({
      title: 'Renomear Categoria',
      message: "Altere o nome da categoria",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: roupaCategoria
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salvar',
          handler: data => {
            this.roupas.update(roupaId, {
              title: data.title
            });
          }
        }
      ]
    });
    prompt.present();
  }

  goCloset() {
    this.nav.setRoot(Closet);
  }

  goLooks() {

  }



  goDicas() {

  }

  goMaquiagem() {

  }

  goCabelo() {

  }

  goCompras() {

  }

  logout() {
    this.authService.doLogout();
  }

}