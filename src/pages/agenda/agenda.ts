import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import{ AddServicesPage}from'../add-services/add-services';
/**
 * Generated class for the AgendaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  contacto(){
    this.navCtrl.push( AddServicesPage);

  }
  
}
