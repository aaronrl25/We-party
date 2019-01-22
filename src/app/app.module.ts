import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Menu } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { GooglePlus } from '@ionic-native/google-plus';
import { Keyboard } from '@ionic-native/keyboard';
import { Geolocation } from '@ionic-native/geolocation';
import { MyApp } from './app.component';
import { TimelinePage } from '../pages/timeline/timeline';
import { IonicStorageModule } from '@ionic/storage';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { VerificationPage } from '../pages/verification/verification';
import { TrialPage } from '../pages/trial/trial';
import { TabsPage } from '../pages/tabs/tabs';
import { MessagesPage } from '../pages/messages/messages';
import { GroupsPage } from '../pages/groups/groups';
import { FriendsPage } from '../pages/friends/friends';
import { SearchPeoplePage } from '../pages/search-people/search-people';
import { RequestsPage } from '../pages/requests/requests';
import { UserInfoPage } from '../pages/user-info/user-info';
import { NewMessagePage } from '../pages/new-message/new-message';
import { MessagePage } from '../pages/message/message';
import { NewGroupPage } from '../pages/new-group/new-group';
import { GroupPage } from '../pages/group/group';
import { GroupInfoPage } from '../pages/group-info/group-info';
import { AddMembersPage } from '../pages/add-members/add-members';
import { ImageModalPage } from '../pages/image-modal/image-modal';
import { GalleryPage } from '../pages/gallery/gallery';
import { MapPage } from '../pages/map/map';
import { IntroPage } from '../pages/intro/intro';
import {museoPage}from '../pages/museos/map/map';
import { LoginProvider } from '../providers/login';
import { LogoutProvider } from '../providers/logout';
import { LoadingProvider } from '../providers/loading';
import { AlertProvider } from '../providers/alert';
import { ImageProvider } from '../providers/image';
import { DataProvider } from '../providers/data';
import { FirebaseProvider } from '../providers/firebase';
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { Login } from '../login';

import { FriendPipe } from '../pipes/friend';
import { SearchPipe } from '../pipes/search';
import { ConversationPipe } from '../pipes/conversation';
import { DateFormatPipe } from '../pipes/date';
import { GroupPipe } from '../pipes/group';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { GoogleMapsProvider } from '../providers/google-maps/google-maps';
import { MenuPage } from '../pages/menu/menu';
import { ClubPage } from '../pages/club/club';
import { ClubsPage } from '../pages/clubs/clubs';

import { InfoPage } from '../pages/info/info';
import { QuePage } from '../pages/que/que';
import { AgendaPage } from '../pages/agenda/agenda';
import { AddServicesPage } from '../pages/add-services/add-services';
import { AddPage } from '../pages/add/add';
import { PrograPage } from '../pages/progra/progra';

import { EventsPage } from '../pages/events/events';
import { LocationSelectPage} from '../pages/location-select/location-select';

firebase.initializeApp(Login.firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    PrograPage ,
    AddPage,
    AddServicesPage ,
AgendaPage,
InfoPage,
museoPage,
    QuePage,
    LocationSelectPage,
    EventsPage,
    TimelinePage,
    GalleryPage,
    HomePage,
    ClubPage,
    IntroPage,
    MapPage,
    VerificationPage,
    TrialPage,
    TabsPage,
    ClubsPage,
    MessagesPage,
    GroupsPage,
    FriendsPage,
    SearchPeoplePage,
    RequestsPage,
    UserInfoPage,
    NewMessagePage,
    MessagePage,
    NewGroupPage,
    GroupPage,
    GroupInfoPage,
    AddMembersPage,
    ImageModalPage,
    FriendPipe,
    ConversationPipe,
    SearchPipe,
    DateFormatPipe,
    GroupPipe,
    InfoPage,
MenuPage

  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),

    IonicModule.forRoot(MyApp, {
      mode: 'ios',
      scrollAssist: false,
      autoFocusAssist: false
    }),
    AngularFireModule.initializeApp(Login.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    museoPage,
    PrograPage ,
    ClubsPage,
    InfoPage,
    AddServicesPage ,
    AgendaPage,
    AddPage,
    IntroPage,
    EventsPage,
    GalleryPage,
    LocationSelectPage,
  LoginPage,
    HomePage,
    QuePage,
    TimelinePage,
    ClubPage,
    VerificationPage,
    MapPage,
    TrialPage,
    InfoPage,
    TabsPage,
    MessagesPage,
    GroupsPage,
    FriendsPage,
    SearchPeoplePage,
    RequestsPage,
    UserInfoPage,
    NewMessagePage,
    MessagePage,
    NewGroupPage,
    GroupPage,
    GroupInfoPage,
    AddMembersPage,
    ImageModalPage,
    MenuPage
  ],
  providers: [
    Geolocation,
    StatusBar, SplashScreen, Camera, GooglePlus, Keyboard, { provide: ErrorHandler, useClass: IonicErrorHandler }, LoginProvider, LogoutProvider, LoadingProvider, AlertProvider, ImageProvider, DataProvider, FirebaseProvider,
    ConnectivityServiceProvider,
    GoogleMapsProvider]
})
export class AppModule { }
