// Login Constants.
// This file contains all your Firebase settings, and app routes.
// It's important to set in your Firebase, Facebook, and Google app credentials here.
// If you have a different view for the homePage, trialPage, and verificationPage
// You can import them here and set them accordingly.
// If you want to disable emailVerification, simply set it to false.

import { TabsPage } from './pages/tabs/tabs';
import { VerificationPage } from './pages/verification/verification';
import { TrialPage } from './pages/trial/trial';
import { GroupsPage } from './pages/groups/groups';

export namespace Login {
  // Get your Firebase app's config on your Firebase console. "Add Firebase to your web app".
  export const firebaseConfig = {
    apiKey: "AIzaSyD6pNhoXN2IYPuRG9y8Ubx6y2nCCknuS4o",
    authDomain: "we-party.firebaseapp.com",
    databaseURL: "https://we-party.firebaseio.com",
    projectId: "we-party",
    storageBucket: "we-party.appspot.com",
    messagingSenderId: "358523520946" 
  };
  
  // Get your Facebook App Id from your app at http://developers.facebook.com
  export const facebookAppId: string = "232127647543355";
  // Get your Google Web Client Id from your Google Project's Credentials at https://console.developers.google.com/apis/credentials
  // Or from your google-services.json under:
  // "oauth_client": [
  //   {
  //     "client_id": "31493597450-u75kd39sk6f8q6r4bfh807oush6tq7lu.apps.googleusercontent.com",
  //     "client_type": 3
  //   }
  // ]
  // MAKE SURE TO GET THE client_id OF client_type 3 and NOT client_type 1!!!
  export const googleClientId: string = "358523520946-ug5hm4ssj1fhv8garip5b78lsinpt9kf.apps.googleusercontent.com";
  // Set in your appropriate Login routes, don't forget to import the pages on app.module.ts
  export const homePage =TabsPage;
  
  export const verificationPage = VerificationPage;
  export const trialPage = TrialPage;
  // Set whether emailVerification is enabled or not.
  export const emailVerification: boolean = false;
}
