import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from './auth-service';
import { AlertController, ActionSheetController} from 'ionic-angular';//menu1
import {AngularFire, FirebaseListObservable} from 'angularfire2';//menu1
import { Camera } from '@ionic-native/camera';
import firebase from 'firebase';


@Injectable()
export class MenuService {
  categorias: FirebaseListObservable<any>;//menu1

  constructor(public http: Http, public authService: AuthService, public alertCtrl: AlertController, public af: AngularFire, public actionSheetCtrl: ActionSheetController) {
    // this.categorias = af.database.list('/categorias');
  }

  // addCategoria() {//menu1
  //   let prompt = this.alertCtrl.create({
  //     title: 'Nova Categoria',
  //     message: "Adicione uma nova categoria",
  //     inputs: [
  //       {
  //         name: 'title',
  //         placeholder: 'Title'
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Salvar',
  //         handler: data => {
  //           this.categorias.push({
  //             title: data.title
  //           });
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }
  //
  // showOptions(categoriaID, roupaCategoria) {//menu1
  //   let actionSheet = this.actionSheetCtrl.create({
  //     title: 'Opções',
  //     buttons: [
  //       {
  //         text: 'Excluir',
  //         role: 'destructive',
  //         handler: () => {
  //           this.removeCategoria(categoriaID);
  //         }
  //       }, {
  //         text: 'Renomear',
  //         handler: () => {
  //           this.updateCategoria(categoriaID, roupaCategoria);
  //         }
  //       }, {
  //         text: 'Cancelar',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   });
  //   actionSheet.present();
  // }
  //
  // removeCategoria(categoriaID: string) {//menu1
  //   this.categorias.remove(categoriaID);
  // }
  //
  // updateCategoria(categoriaID, roupaCategoria) {//menu1
  //   let prompt = this.alertCtrl.create({
  //     title: 'Renomear Categoria',
  //     message: "Altere o nome da categoria",
  //     inputs: [
  //       {
  //         name: 'title',
  //         placeholder: 'Title',
  //         value: roupaCategoria
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Salvar',
  //         handler: data => {
  //           this.categorias.update(categoriaID, {
  //             title: data.title
  //           });
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }
  //
  // logout() {
  //   this.authService.doLogout();
  // }

}
