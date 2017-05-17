import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { FotoService } from './foto-service';
import firebase from 'firebase';



@Injectable()
export class PerfilService {

  imgPerfil: any;
  nome: any;
  userName: any;
  email: any;
  closetsID: any;
  imgNome: any;
  ultimaAtualizacao: any;
  amigos: any;
  telefone: any;
  idade: any;

  constructor(public http: Http, public fotoService: FotoService) {

  }

  updatePerfil(){

  }

  setImgPerfil() {
    this.fotoService.carregaFotoPerfil((data) => {
      this.imgPerfil = data;
    });
  }

  setDataPerfil() {
    firebase.database().ref('userData').child(firebase.auth().currentUser.uid).once('value', (snapshot: any) => {
      this.imgPerfil = snapshot.val().url,
        this.nome = snapshot.val().nome,
        this.userName = snapshot.val().username,
        this.email = snapshot.val().email,
        this.imgNome = snapshot.val().imgNome,
        this.ultimaAtualizacao = snapshot.val().ultimaAtualizacao
    });
  }

}
