import { Login } from '../login/login';
import { HomePage } from '../pages/home/home';
import firebase from 'firebase';
import { AuthService } from '../../providers/auth-service';
import { NavController} from 'ionic-angular';


export class User {
  private nome: string;
  private userName: string;
  private email: string;
  private userID: string;
  private closetsID: string[];
  private URLperfil: string;
  private imgNome: string;
  private ultimaAtualizacao: number;
  private amigos: string[];


  constructor(public navCtrl: NavController) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        navCtrl.setRoot(Login);
      }else{
        // getUserData();
        navCtrl.setRoot(HomePage);
      }
    });
  }


  updateUser(uploadSnapshot) {
    var ref = firebase.database().ref('userData');
    return new Promise((resolve, reject) => {
      var dataToSave = uploadSnapshot;
      ref.child(firebase.auth().currentUser.uid).update(dataToSave, (response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });

    });

  }
  public setNome(nome: string) {
    this.nome = nome;
  }

  public setUserNome(userName: string) {
    this.userName = userName;
  }

  public setEmail(email: string) {
    this.email = email;
  }

  public setUserID(id: string) {
    this.userID = id;
  }

  public getNome(): string {
    return this.nome;
  }

  public getuserName(): string {
    return this.userName;
  }

  public getEmail(): string {
    return this.email;
  }

  public getUserID(): string {
    return this.userID;
  }
}
