import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ToastController} from 'ionic-angular';

import { AngularFireDatabase} from 'angularfire2/database';

/**
 * Generated class for the ClubPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-club',
  templateUrl: 'club.html',
})
export class ClubPage {

  category: any[] = [];
  viewType: string = "grid";

  constructor(public navCtrl: NavController,public navParams: NavParams,public loadingCtrl: LoadingController, public afDB: AngularFireDatabase ,private toastCtrl: ToastController ) {

  let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ''
    });
    loadingPopup.present();
    this.afDB.list('/category', {query: {
        orderByChild: "type",
        equalTo: "place"
    }}).subscribe(categoryItems => {
      this.category = categoryItems;
      loadingPopup.dismiss()
    });
  }


  //*********** Open list page  **************/
  openList(categoryId){
      console.log("openList");
      this.navCtrl.push('List1Page',{categoryId:categoryId}); 
  }

}