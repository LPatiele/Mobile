import { Component } from '@angular/core';
import { NavController,AlertController, ActionSheetController, MenuController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { PerfilService } from '../../providers/perfil-service';
import { Feed } from '../feed/feed';
import firebase from 'firebase';

@Component({
  selector: 'page-closet',
  templateUrl: 'closet.html'
})

export class Closet {
  closet: any;
  categorias: FirebaseListObservable<any>;//equivale a songs

  constructor(public navCtrl: NavController,public perfilService: PerfilService, public alertCtrl: AlertController, public menuCtrl: MenuController, af: AngularFire, public actionSheetCtrl: ActionSheetController) {
    this.menuCtrl.enable(true, 'menu2');
    this.perfilService.setDataPerfil();
    this.closet= firebase.database().ref('/userData/'+firebase.auth().currentUser.uid+'/closet');
    this.categorias = af.database.list('/categorias');
  }

  goLook(){
    this.navCtrl.setRoot(Feed);
  }

  addCategoria() {
    let prompt = this.alertCtrl.create({
      title: 'Nova Categoria',
      message: "Adicione uma nova categoria",
      inputs: [
        {
          name: 'titulo',
          placeholder: 'Titulo'
        }
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
            this.categorias.push({
              titulo: data.titulo
            });
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(categoriaID, categoriaAtual) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Opções',
      buttons: [
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.removeCategoria(categoriaID);
          }
        }, {
          text: 'Renomear',
          handler: () => {
            this.updateCategoria(categoriaID, categoriaAtual);
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

  removeCategoria(categoriaID: string) {
    this.categorias.remove(categoriaID);
  }

  updateCategoria(categoriaID, categoriaAtual) {
    let prompt = this.alertCtrl.create({
      title: 'Renomear Categoria',
      message: "Altere o nome da categoria",
      inputs: [
        {
          name: 'titulo',
          placeholder: 'Title',
          value: categoriaAtual
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
            this.categorias.update(categoriaID, {
              titulo: data.titulo
            });
          }
        }
      ]
    });
    prompt.present();
  }
}
