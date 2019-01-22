import { GroupPage } from '../group/group';
import { Geolocation } from '@ionic-native/geolocation';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { mapStyle } from './mapStyle';
import { NavController, AlertController, NavParams, App } from 'ionic-angular';
import { LogoutProvider } from '../../providers/logout';
import { LoadingProvider } from '../../providers/loading';
import { AlertProvider } from '../../providers/alert';
import { ImageProvider } from '../../providers/image';
import { DataProvider } from '../../providers/data';
import { AngularFireDatabase } from 'angularfire2/database';
import { Validator } from '../../validator';
import { Login } from '../../login';
import { Camera } from '@ionic-native/camera';
import { HomePage } from '../home/home';
import { ClubPage } from '../club/club';
import { SearchPeoplePage } from '../search-people/search-people';
import { UserInfoPage } from '../user-info/user-info';
import { MessagePage } from '../message/message';
import { RequestsPage } from '../requests/requests';
import * as firebase from 'firebase';

import { GroupsPage } from '../groups/groups';
import { MessagesPage } from '../messages/messages';
import { NewGroupPage } from '../new-group/new-group';
import { AgendaPage } from '../agenda/agenda';
import { LocationSelectPage} from '../location-select/location-select';
import { FirebaseListObservable } from 'angularfire2/database';


@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {
  private friends: any;
  private friendRequests: any;
  private searchFriend: any;
  private user: any;
  private alert;
  loaded: boolean ;
  imgGallery: FirebaseListObservable<any[]>;
  imgGalleryArray : any=[]; 
  image: string = null;
  photos: any[] = [];
  getIndex:number;
  private groups: any;
  private searchGroup: any;
  private updateDateTime: any;
  map: any;
  galleryView: string = "two";

  constructor(public navCtrl: NavController,public geolocation: Geolocation, 
    public navParams: NavParams, public app: App, 
     public loadingProvider: LoadingProvider,
    public alertCtrl: AlertController,
    public logoutProvider: LogoutProvider, public imageProvider: ImageProvider,
    public angularfireDatabase: AngularFireDatabase, public alertProvider: AlertProvider, public dataProvider: DataProvider, public camera: Camera) {

    }
  ionViewDidLoad() {
    // Initialize
    this.searchGroup = '';
    this.searchFriend = '';
    this.loadingProvider.show();

    this.loadingProvider.show();
      // Observe the userData on database to be used by our markup html.
      // Whenever the userData on the database is updated, it will automatically reflect on our user variable.
      this.loadingProvider.show();
      this.dataProvider.getCurrentUser().subscribe((user) => {
        this.loadingProvider.hide();
        this.user = user;
      });
      this.dataProvider.getRequests(firebase.auth().currentUser.uid).subscribe((requests) => {
        this.friendRequests = requests.friendRequests;
      });
      this.dataProvider.getCurrentUser().subscribe((account) => {
        if (account.friends) {
          for (var i = 0; i < account.friends.length; i++) {
            this.dataProvider.getUser(account.friends[i]).subscribe((friend) => {
              this.addOrUpdateFriend(friend);
            });
          }
        } else {
          this.friends = [];
        }
        this.loadingProvider.hide();
      });
    
    // Get groups
    this.dataProvider.getGroups().subscribe((groupIds) => {
      if (groupIds.length > 0) {
        if(this.groups && this.groups.length > groupIds.length) {
          // User left/deleted a group, clear the list and add or update each group again.
          this.groups = [];
        }
        groupIds.forEach((groupId) => {
          this.dataProvider.getGroup(groupId.$key).subscribe((group) => {
            if (group.$exists()) {
              // Get group's unreadMessagesCount
              group.unreadMessagesCount = group.messages.length - groupId.messagesRead;
              // Get group's last active date
              group.date = group.messages[group.messages.length - 1].date;
              this.addOrUpdateGroup(group);
            }
          });
        });
        this.loadingProvider.hide();
      } else {
        this.groups = [];
        this.loadingProvider.hide();
      }
    });

    // Update groups' last active date time elapsed every minute based on Moment.js.
    var that = this;
    if (!that.updateDateTime) {
      that.updateDateTime = setInterval(function() {
        if (that.groups) {
          that.groups.forEach((group) => {
            let date = group.date;
            group.date = new Date(date);
          });
        }
      }, 60000);
    }
  }

  back() {
    this.navCtrl.pop();
  }
    
 
  // Add or update group for real-time sync based on our observer.
  addOrUpdateGroup(group) {
    if (!this.groups) {
      this.groups = [group];
    } else {
      var index = -1;
      for (var i = 0; i < this.groups.length; i++) {
        if (this.groups[i].$key == group.$key) {
          index = i;
        }
      }
      if (index > -1) {
        this.groups[index] = group;
      } else {
        this.groups.push(group);
      }
    }
  }
  

 removeGroup(group) {
  if (this.groups) {
     var index = -1;
      for (var i = 0; i < this.groups.length; i++) {
     if (this.groups[i].$key == group.$key) {
         index = i;
        }
      }
    if (index > -1) {
       this.groups.splice(index, 1);
     }
   }
   }

  // New Group.
  
  
    newGroup() {
    this.app.getRootNav().push(NewGroupPage);
  }

  // Open Group Chat.
  viewGroup(groupId) {
    this.app.getRootNav().push(GroupPage, { groupId: groupId });
  }

  // Return class based if group has unreadMessages or not.
  hasUnreadMessages(group) {
    if (group.unreadMessagesCount > 0) {
      return 'group bold';
    } else
      return 'group';
  }
  

  // Add or update friend data for real-time sync.
  addOrUpdateFriend(friend) {
    if (!this.friends) {
      this.friends = [friend];
    } else {
      var index = -1;
      for (var i = 0; i < this.friends.length; i++) {
        if (this.friends[i].$key == friend.$key) {
          index = i;
        }
      }
      if (index > -1) {
        this.friends[index] = friend;
      } else {
        this.friends.push(friend);
      }
    }
  }

  // Proceed to searchPeople page.
  searchPeople() {
    this.app.getRootNav().push(SearchPeoplePage);
  }

  // Proceed to requests page.
  manageRequests() {
    this.app.getRootNav().push(RequestsPage);
  }

  // Proceed to userInfo page.
  viewUser(userId) {
    this.app.getRootNav().push(UserInfoPage, { userId: userId });
  }

  // Proceed to chat page.
  message(userId) {
    this.app.getRootNav().push(MessagePage, { userId: userId });
  }
}





  



