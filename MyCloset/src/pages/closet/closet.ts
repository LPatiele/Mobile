import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, MenuController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { PerfilService } from '../../providers/perfil-service';
import { Categoria } from '../categoria/categoria';
import firebase from 'firebase';
import { Perfil } from '../perfil/perfil';


@Component({
  selector: 'page-closet',
  templateUrl: 'closet.html'
})

export class Closet {
  roupasID: any;
  closet: any;
  categorias: FirebaseListObservable<any>;//equivale a songs
  // numCtg :any;

  constructor(public navCtrl: NavController, public perfilService: PerfilService, public alertCtrl: AlertController, public menuCtrl: MenuController, af: AngularFire, public actionSheetCtrl: ActionSheetController) {
    var self = this;
    firebase.database().ref('userData').child(firebase.auth().currentUser.uid).once('value', (snapshot: any) => {
      self.closet = snapshot.val().closet;
      self.roupasID = snapshot.val().roupas;
      console.log(this.roupasID + '    roupas');
      console.log(this.closet + '   closet');

      this.categorias = af.database.list('/closets/' + self.closet + '/categorias');



      // var ref = firebase.database().ref('closets').child(self.closet);
      //   ref.once("value", function(snapshot) {
      //     self.numCtg = snapshot.child("categorias").hasChildren();
      //     console.log(  self.numCtg+' self');
      //     console.log(  this.numCtg+' this');
      //   });
      //   console.log(  self.numCtg);
      //   console.log(  this.numCtg);

    });

    this.menuCtrl.enable(true, 'menu2');
    this.perfilService.setDataPerfil();

  }



  goCategoria(categoriaID, categoriaAtual) {
    this.navCtrl.push(Categoria, {
      id: categoriaID,
      nome: categoriaAtual,
      closet: this.closet,
      idRoupas: this.roupasID
    });
  }

  addCategoria() {
    let refRoupas = firebase.database().ref('/roupas/'+ this.roupasID+'/');
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
              titulo: data.titulo,
              idRoupas:refRoupas.push({ nomeCtg: data.titulo}).key
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
