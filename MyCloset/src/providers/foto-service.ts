import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AlertController, ActionSheetController, NavController } from 'ionic-angular';//menu1
import {AngularFire, FirebaseListObservable} from 'angularfire2';//menu1
import { Camera } from '@ionic-native/camera';
import firebase from 'firebase';


declare var window: any;

@Injectable()
export class FotoService {


  constructor(public http: Http, private camera: Camera, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {

  }

  setOptions(srcType) {
    var options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: srcType,
      correctOrientation: true,
      targetHeight: 640,
    }
    return options;
  }

  goFoto() {
    let prompt = this.alertCtrl.create({
      title: 'Alterar Imagem',
      message: "Altere a imagem de perfil",
      buttons: [
        {
          text: 'Camera',
          handler: data => {
            var srcType = this.camera.PictureSourceType.CAMERA;
            var options = this.setOptions(srcType);

            this.camera.getPicture(options).then((imageData) => {
              return this.toBlob(imageData, 1);
            }).then((imageBlob) => {
              return this.uploadData(imageBlob);
            }).then((uploadSnapshot: any) => {
              return this.salvarReferencia(uploadSnapshot);
            }).then((uploadSnapshot: any) => {
              //alert('Arquivo salvo para o catálogo com sucesso');
            }, (error) => {
              alert('Erro ' + (error.message || error));

            });

          }
        },
        {
          text: 'Galeria',
          handler: data => {
            var srcType = this.camera.PictureSourceType.PHOTOLIBRARY;
            var options = this.setOptions(srcType);

            this.camera.getPicture(options).then((imageData) => {
              return this.toBlob(imageData, 2);
            }).then((imageBlob) => {
              return this.uploadData(imageBlob);
            }).then((uploadSnapshot: any) => {
              return this.salvarReferencia(uploadSnapshot);
            }).then((uploadSnapshot: any) => {
              //alert('Arquivo salvo para o catálogo com sucesso');
            }, (error) => {
              alert('Erro ' + (error.message || error));
            });
          }
        }
      ]
    });
    prompt.present();
  }

  goFotoPerfil() {
    let prompt = this.alertCtrl.create({
      title: 'Alterar Imagem',
      message: "Altere a imagem de perfil",
      buttons: [
        {
          text: 'Camera',
          handler: data => {
            var srcType = this.camera.PictureSourceType.CAMERA;
            var options = this.setOptions(srcType);

            this.camera.getPicture(options).then((imageData) => {
              return this.toBlob(imageData, 1);
            }).then((imageBlob) => {
              return this.uploadDataPerfil(imageBlob);
            }).then((uploadSnapshot: any) => {
              return this.salvarReferencia(uploadSnapshot);
            }).then((uploadSnapshot: any) => {
              //alert('Arquivo salvo para o catálogo com sucesso');
            }, (error) => {
              alert('Erro ' + (error.message || error));

            });

          }
        },
        {
          text: 'Galeria',
          handler: data => {
            var srcType = this.camera.PictureSourceType.PHOTOLIBRARY;
            var options = this.setOptions(srcType);

            this.camera.getPicture(options).then((imageData) => {
              return this.toBlob(imageData, 2);
            }).then((imageBlob) => {
              return this.uploadDataPerfil(imageBlob);
            }).then((uploadSnapshot: any) => {
              return this.salvarReferencia(uploadSnapshot);
            }).then((uploadSnapshot: any) => {
              //alert('Arquivo salvo para o catálogo com sucesso');
            }, (error) => {
              alert('Erro ' + (error.message || error));
            });
          }
        }
      ]
    });
    prompt.present();
  }

  toBlob(imgUri, tipo: number) {
    var caminho;
    if (tipo == 1) {
      caminho = '';
    } else if (tipo == 2) {
      caminho = 'file://';
    }
    var imgBlob: any;
    return new Promise((resolve, reject) => {
      window.resolveLocalFileSystemURL(caminho + imgUri, (fileEntry) => {
        fileEntry.file((resFile) => {
          var reader = new FileReader();
          reader.onloadend = (evt: any) => {
            imgBlob = new Blob([evt.target.result], { type: 'image/jpeg/jpg' });
            imgBlob.name = 'perfil.jpg';
            resolve(imgBlob);
          };
          reader.onerror = (e) => {
            console.log('Erro na leitura do arquivo: ' + e.toString());
            reject(e);
          };
          reader.readAsArrayBuffer(resFile);
        });
      });
    });
  }

  uploadDataPerfil(imageBlob) {
    var fileName = 'perfil-' + new Date().getTime() + '.jpg';
    var pasta = firebase.auth().currentUser.uid;

    var anteriorName= this.fotoAnterior();
    var anterior= firebase.storage().ref().child('imagens/' + pasta + '/' + anteriorName);
    anterior.delete();

    return new Promise((resolve, reject) => {
      var fileRef = firebase.storage().ref('imagens/' + pasta + '/' + fileName);
      var uploadTask = fileRef.put(imageBlob);

      uploadTask.on('state_changed', (snapshot) => {
        console.log('snapshot progess ' + snapshot);
      }, (error) => {
        reject(error);
      }, () => {
        resolve(uploadTask.snapshot);
      });
    });
  }

  uploadData(imageBlob) {
    var fileName = 'perfil-' + new Date().getTime() + '.jpg';
    var pasta = firebase.auth().currentUser.uid;

    return new Promise((resolve, reject) => {
      var fileRef = firebase.storage().ref('imagens/' + pasta + '/' + fileName);
      var uploadTask = fileRef.put(imageBlob);

      uploadTask.on('state_changed', (snapshot) => {
        console.log('snapshot progess ' + snapshot);
      }, (error) => {
        reject(error);
      }, () => {
        resolve(uploadTask.snapshot);
      });
    });
  }

  fotoAnterior () {
    var element
    firebase.database().ref('userData').child(firebase.auth().currentUser.uid).once('value', (snapshot: any) => {
      element = snapshot.val().imgNome;
    });
    return element;
  }

  carregaFotoPerfil(callback: (data) => void) {
    firebase.database().ref('userData').child(firebase.auth().currentUser.uid).once('value', (snapshot: any) => {
      var element = snapshot.val().url;
      callback(element);
    });
  }

  salvarReferencia(uploadSnapshot) {
    var ref = firebase.database().ref('userData');
    return new Promise((resolve, reject) => {
      var dataToSave = {
        'url': uploadSnapshot.downloadURL, // url to access file
        'imgNome': uploadSnapshot.metadata.name // name of the file
      };
      ref.child(firebase.auth().currentUser.uid).update(dataToSave, (response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });

  }


}
