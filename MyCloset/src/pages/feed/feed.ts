import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { FotoService } from '../../providers/foto-service';
import firebase from 'firebase';



@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class Feed {


  constructor(public navCtrl: NavController, public navParams: NavParams, public fotoService: FotoService, public menuCtrl: MenuController) {
    this.menuCtrl.enable(true, 'menu2');
    this.fotoService.setImgPerfil();
  }

update(){
  var user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: "Looha",
    photoURL: "https://example.com/jane-q-user/profile.jpg"
  })
}

}
