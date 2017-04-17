import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import * as firebase from 'firebase'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';
import { Resetpwd } from '../pages/resetpwd/resetpwd';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AuthService } from '../providers/auth-service';

export const firebaseConfig = {
     apiKey: "AIzaSyDNEf5uzs5Ujo93UbXN_TNjZJ_qYMTJHGg",
     authDomain: "mycloset-45165.firebaseapp.com",
     databaseURL: "https://mycloset-45165.firebaseio.com",
     projectId: "mycloset-45165",
     storageBucket: "mycloset-45165.appspot.com",
     messagingSenderId: "436435406259"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Login,
    Register,
    Resetpwd
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    BrowserModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Login,
    Register,
    Resetpwd
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
