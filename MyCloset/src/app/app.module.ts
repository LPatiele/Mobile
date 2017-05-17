import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import * as firebase from 'firebase';
import { Camera } from '@ionic-native/camera'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Closet } from '../pages/closet/closet';
import { Feed } from '../pages/feed/feed';
import { Look } from '../pages/look/look';
import { Perfil } from '../pages/perfil/perfil';
import { Categoria } from '../pages/categoria/categoria';
import { Amigos } from '../pages/amigos/amigos';
import { Register } from '../pages/register/register';
import { Resetpwd } from '../pages/resetpwd/resetpwd';
import { AddAmigos } from '../pages/add-amigos/add-amigos';
import { MeusAmigos } from '../pages/meus-amigos/meus-amigos';
import { Seguindo } from '../pages/seguindo/seguindo';
import { Seguidores } from '../pages/seguidores/seguidores';
import { Seguir } from '../pages/seguir/seguir';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AuthService } from '../providers/auth-service';
import { MenuService } from '../providers/menu-service';
import { FotoService } from '../providers/foto-service';
import { PerfilService } from '../providers/perfil-service';

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
    Resetpwd,
    Closet,
    Feed,
    Amigos,
    AddAmigos,
    MeusAmigos,
    Seguindo,
    Seguidores,
    Seguir,
    Categoria,
    Look,
    Perfil
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
    Resetpwd,
    Closet,
    Feed,
    Amigos,
    AddAmigos,
    MeusAmigos,
    Seguindo,
    Seguidores,
    Seguir,
    Categoria,
    Look,
    Perfil
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    Camera,
    MenuService,
    FotoService,
    PerfilService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
