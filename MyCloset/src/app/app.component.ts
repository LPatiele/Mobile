import { Component, NgZone, ViewChild} from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuService } from '../providers/menu-service';
import { HomePage } from '../pages/home/home';
import firebase from 'firebase';



@Component({
  selector: 'app-style',
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage: any = HomePage;
  @ViewChild('mycontent') nav: NavController
  imgPerfil
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public menu: MenuService) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }




}
