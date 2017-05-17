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
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: srcType,
      correctOrientation: true
    }
    return options;
  }

  goRoupa(ref) {
    let prompt = this.alertCtrl.create({
      title: 'Adicionar peça de roupa',
      // message: "Adicione uma nova peça ao seu closet",
      buttons: [
        {
          text: 'Camera',
          handler: data => {
            var srcType = this.camera.PictureSourceType.CAMERA;
            var options = this.setOptions(srcType);

            this.camera.getPicture(options).then((imageData) => {
              return this.toBlob(imageData, false);
            }).then((imageBlob) => {
              alert('termina o blob 2 ');
              return this.uploadDataRoupa(imageBlob);
            }).then((uploadSnapshot: any) => {
              alert('termina upload ');
              return this.salvarRef(uploadSnapshot,ref);
            }).then((uploadSnapshot: any) => {
              alert('salva ref ');
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
              return this.toBlob(imageData, true);
            }).then((imageBlob) => {
              alert('termina o blob 2 ');
              return this.uploadDataRoupa(imageBlob);
            }).then((uploadSnapshot: any) => {
              alert('termina upload ');
              return this.salvarRef(uploadSnapshot,ref);
            }).then((uploadSnapshot: any) => {
              alert('salva ref ');
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

  goFoto(titulo, ref, local) {
    //titulo : titulo da page
    //ref: referencia pra salvar no banco de dados
    //local: local de upload da imagem
    let prompt = this.alertCtrl.create({
      title: titulo,
      buttons: [
        {
          text: 'Camera',
          handler: data => {
            this.picture(true,ref,local);
          }
        },
        {
          text: 'Galeria',
          handler: data => {
            this.picture(false,ref,local);
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
              return this.toBlob(imageData, false);
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
              return this.toBlob(imageData, true);
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

  picture(cam, ref,local){
    var options:any;
    if (cam){//Camera
      options = this.setOptions(this.camera.PictureSourceType.CAMERA);
    }else{//Galeria
      options = this.setOptions(this.camera.PictureSourceType.PHOTOLIBRARY);
    }

    this.camera.getPicture(options).then((imageData) => {
      return this.toBlob(imageData, !cam);
    }).then((imageBlob) => {
      return this.uploadData(imageBlob, local);
    }).then((uploadSnapshot: any) => {
      return this.salvarRef(uploadSnapshot,ref);
    }).then((uploadSnapshot: any) => {
      //alert('Arquivo salvo para o catálogo com sucesso');
    }, (error) => {
      alert('Erro ' + (error.message || error));
    });
  }

  toBlob(imgUri, tipo: Boolean) {
    var caminho = '';
   if (tipo) {
      caminho = 'file://';
    }
    var imgBlob: any;
    return new Promise((resolve, reject) => {
      window.resolveLocalFileSystemURL(caminho + imgUri, (fileEntry) => {
        fileEntry.file((resFile) => {
          var reader = new FileReader();
          reader.onloadend = (evt: any) => {
            imgBlob = new Blob([evt.target.result], { type: 'image/jpeg/jpg' });
            imgBlob.name = 'imagem.jpg';
            resolve(imgBlob);
          };
          reader.onerror = (e) => {
              alert('Erro na leitura do arquivo: ' + e.toString());
            reject(e);
          };
          reader.readAsArrayBuffer(resFile);
          alert('termina o blob ');
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

  uploadData(imageBlob, local) {
    var fileName ='image-' + new Date().getTime() + '.jpg';
    // var pasta = firebase.auth().currentUser.uid;

    return new Promise((resolve, reject) => {
       var fileRef = firebase.storage().ref(local + fileName);
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

  uploadDataRoupa(imageBlob) {
    var fileName = 'imagem-' + new Date().getTime() + '.jpg';
    var pasta = firebase.auth().currentUser.uid;

    return new Promise((resolve, reject) => {
      var fileRef = firebase.storage().ref('roupas/' + pasta + '/' + fileName);
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

  salvarRef(uploadSnapshot,ref) {
    return new Promise((resolve, reject) => {
      var dataToSave = {
        'url': uploadSnapshot.downloadURL, // url to access file
        'imgNome': uploadSnapshot.metadata.name // name of the file
      };
      ref.push(dataToSave, (response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
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
