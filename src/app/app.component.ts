import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { timer } from 'rxjs/observable/timer';

//Pages
   import { LoginPage } from '../pages/login/login';
import { IntroPage } from '../pages/intro/intro';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;
  loader: any;
showSplash=true;
  constructor(platform: Platform,public loadingCtrl: LoadingController,public storage: Storage, statusBar: StatusBar, splashScreen: SplashScreen, keyboard: Keyboard) {
    
    platform.ready().then(() => {
      this.storage.get('introShown').then((result) => {
 
        if(result){
          this.rootPage = LoginPage;
        } else {
          this.rootPage = IntroPage;
          this.storage.set('introShown', true);
        }
 
 
      });
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      keyboard.hideKeyboardAccessoryBar(false);
      timer(3200).subscribe(()=>this.showSplash=false)

    });
  }
  presentLoading() {
 
    this.loader = this.loadingCtrl.create({
      content: "Authenticating..."
    });
 
    this.loader.present();
}
}