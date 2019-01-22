import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html'
})
export class IntroPage {

  slides = [
    {
      title: "",
      description: " ",
      image: "./assets/1.png",
      color: "#white",
    },
    {
      title: "",
      description: "",
      image: "./assets/2.png",
      color: "white",
    },
    {
      title: "",
      description: "",
      image: "./assets/3.png",
      color: "white",
    },
    {
      title: "",
      description: "",
      image: "./assets/5.png",
      color: "white",
    },
    {
      title: "",
      description: "",
      image: "./assets/6.png",
      color: "white",
    }
  ];


  constructor(public navCtrl: NavController) {
  }
  clubs(){

    this.navCtrl.push(LoginPage);
    }
}
