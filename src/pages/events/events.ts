import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';

import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { DataProvider } from '../../providers/data';
import { LoadingProvider } from '../../providers/loading';
import { NewGroupPage } from '../new-group/new-group';
import { LocationSelectPage} from '../location-select/location-select';

import { AngularFireDatabase} from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  category: any[] = [];

  // GroupsPage
  // This is the page where the user can add, view and search for groups.
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController, public afDB: AngularFireDatabase) {
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ''
    });
    loadingPopup.present();
    this.afDB.list('/category', {query: {
      orderByChild: "type",
      equalTo: "ecom" 
  }}).subscribe(categoryItems => {
    this.category = categoryItems;
    loadingPopup.dismiss()
  });
}

openList(categoryId){
  this.navCtrl.push('List2Page',{categoryId:categoryId}); 
}
siguiente(){
  this.navCtrl.push(NewGroupPage); 

}
  }
