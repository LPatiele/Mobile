import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PerfilService } from '../../providers/perfil-service';
import { FormBuilder } from '@angular/forms';
import firebase from 'firebase';


@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class Perfil {

  public perfilForm;
  nomeChanged: boolean = false;
  usernameChanged: boolean = false;
  telefoneChanged: boolean = false;
  idadeChanged: boolean = false;

  constructor(public formBuilder: FormBuilder, public perfilService: PerfilService, public navCtrl: NavController, public navParams: NavParams) {
    this.perfilForm= new FormGroup({
      nome: new FormControl(),
      username: new FormControl(),
      telefone:new FormControl(),
      idade:new FormControl()
    });
  }

  elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

}
