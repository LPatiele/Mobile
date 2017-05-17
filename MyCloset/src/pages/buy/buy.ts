import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { PerfilService } from '../../providers/perfil-service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';
//import { BrowserTab } from '@ionic-native/browser-tab';


@Component({
  selector: 'page-buy',
  templateUrl: 'buy.html',
})
export class Buy {
  Buys: FirebaseListObservable<any>;

  constructor(/*private browserTab: BrowserTab,*/ af: AngularFire,public perfilService: PerfilService, public menuCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams) {
  //   this.Buys = af.database.list('/buy' );
  //   browserTab.isAvailable()
  //  .then((isAvailable: boolean) => {
   //
  //    if (isAvailable) {
   //
  //      browserTab.openUrl('https://www.youtube.com/');
   //
  //    } else {
   //
  //      // open URL with InAppBrowser instead or SafariViewController
   //
  //    }
   //
  //  });
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Buy');
  }

  goBrowser(url){

  }

}
