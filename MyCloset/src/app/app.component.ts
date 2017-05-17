import { Component, NgZone, ViewChild} from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuService } from '../providers/menu-service';
import { HomePage } from '../pages/home/home';
import { Feed } from '../pages/feed/feed';
import { Amigos } from '../pages/amigos/amigos';
import { Closet } from '../pages/closet/closet';
import { Seguir } from '../pages/seguir/seguir';
import { Look } from '../pages/look/look';
import { Make } from '../pages/make/make';
import { Hair } from '../pages/hair/hair';
import { Buy } from '../pages/buy/buy';
import firebase from 'firebase';



@Component({
  selector: 'app-style',
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage: any = HomePage;
  @ViewChild('mycontent') nav: NavController

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menu: MenuService) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  goNovidades() {
    this.nav.setRoot(Feed);
  }

  goCloset() {
    this.nav.setRoot(Closet);
  }

  goLooks() {
    this.nav.setRoot(Look);
  }

  goSeguir() {
    this.nav.setRoot(Seguir);
  }

  goAmigos() {
    this.nav.setRoot(Amigos);
  }

  goDicas() {

  }

  goMaquiagem() {
    this.nav.setRoot(Make);
  }

  goCabelo() {
    this.nav.setRoot(Hair);
  }

  goCompras() {
    this.nav.setRoot(Buy);
  }


}
