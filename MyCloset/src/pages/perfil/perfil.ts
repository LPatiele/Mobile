import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PerfilService } from '../../providers/perfil-service';
import { FormBuilder, Validators  } from '@angular/forms';
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
    this.perfilForm = formBuilder.group({
      nome: '',
      username: '',
      telefone: '',
      idade:''
    });
    console.log(this.perfilForm.nome );
  }

  elementChanged(input) {
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
    console.log(this[field + "Changed"] );

  }
  atualiza(){
// console.log(this.perfilForm.nome.value );
// console.log(this.perfilForm.username.value );
// console.log(this.perfilForm.telefone.value );
// console.log(this.perfilForm.idade.value );
  }

}
