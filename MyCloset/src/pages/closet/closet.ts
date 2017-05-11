import { Component } from '@angular/core';
import { AlertController, ActionSheetController, MenuController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { PerfilService } from '../../providers/perfil-service';

@Component({
  selector: 'page-closet',
  templateUrl: 'closet.html'
})

export class Closet {
  private closetsID: string;
  private categorias: FirebaseListObservable<any>;
  roupas: FirebaseListObservable<any>;//equivale a songs

  constructor(public perfilService: PerfilService, public alertCtrl: AlertController, public menuCtrl: MenuController, public af: AngularFire, public actionSheetCtrl: ActionSheetController) {
    this.perfilService.setDataPerfil();
    this.roupas = af.database.list('/roupas');
    this.menuCtrl.enable(true, 'menu1');
  }

  addRoupa() {
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

  showOptions(roupaId, roupaCategoria) {
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

  removeCategoria(roupaId: string) {
    this.roupas.remove(roupaId);
  }

  updateCategoria(roupaId, roupaCategoria) {
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
}
