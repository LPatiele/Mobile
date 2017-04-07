import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BrowserModule } from '@angular/platform-browser';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from '../pages/login/login';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyDNEf5uzs5Ujo93UbXN_TNjZJ_qYMTJHGg",
  authDomain: "mycloset-45165.firebaseapp.com",
  databaseURL: "https://mycloset-45165.firebaseio.com",
  projectId: "mycloset-45165",
  storageBucket: "mycloset-45165.appspot.com",
  messagingSenderId: "436435406259"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    BrowserModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
