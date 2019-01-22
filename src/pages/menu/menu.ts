import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, App } from 'ionic-angular';
import { LogoutProvider } from '../../providers/logout';
import { LoadingProvider } from '../../providers/loading';
import { AlertProvider } from '../../providers/alert';
import { ImageProvider } from '../../providers/image';
import { DataProvider } from '../../providers/data';
import { AngularFireDatabase } from 'angularfire2/database';
import { Validator } from '../../validator';
import { Login } from '../../login';
import * as firebase from 'firebase';
import { Camera } from '@ionic-native/camera';
import { HomePage } from '../home/home';
import { ClubPage } from '../club/club';
import { InfoPage } from '../info/info';
import { ClubsPage } from '../clubs/clubs';

import { GroupsPage } from '../groups/groups';
import { MessagesPage } from '../messages/messages';
import { NewGroupPage } from '../new-group/new-group';
import { AgendaPage } from '../agenda/agenda';
import { LocationSelectPage} from '../location-select/location-select';
import {museoPage}from '../museos/map/map';

/**
 * Generated class for the MenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  private user: any;
  private alert;
  // HomePage
  // This is the page where the user is directed after successful login and email is confirmed.
  // A couple of profile management function is available for the user in this page such as:
  // Change name, profile pic, email, and password
  // The user can also opt for the deletion of their account, and finally logout.
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public app: App,
    public logoutProvider: LogoutProvider, public loadingProvider: LoadingProvider, public imageProvider: ImageProvider,
    public angularfireDatabase: AngularFireDatabase, public alertProvider: AlertProvider, public dataProvider: DataProvider, public camera: Camera) {
    this.logoutProvider.setApp(this.app);
  }

  ionViewDidLoad() {
    // Observe the userData on database to be used by our markup html.
    // Whenever the userData on the database is updated, it will automatically reflect on our user variable.
    this.loadingProvider.show();
    this.dataProvider.getCurrentUser().subscribe((user) => {
      this.loadingProvider.hide();
      this.user = user;
    });
  }
  info(){

    this.navCtrl.push(AgendaPage);
    }
  groups(){

    this.navCtrl.push(LocationSelectPage);
    }
  fiestas(){

  this.navCtrl.push(ClubsPage);
  }
mensajes(){
  this.navCtrl.push(MessagesPage);

}
profile(){
  this.navCtrl.push(InfoPage);

}
clubs(){

  this.navCtrl.push(museoPage);
  }
  
    settings(){

      this.navCtrl.push(HomePage);
      }
  // Change user's profile photo. Uses imageProvider to process image and upload on Firebase and update userData.
  logout() {
    this.alert = this.alertCtrl.create({
      title: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Logout',
          handler: data => { this.logoutProvider.logout(); }
        }
      ]
    }).present();
  }
}


