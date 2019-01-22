import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { FirebaseProvider } from '../../providers/firebase';
import { ImageModalPage } from '../image-modal/image-modal';
import { Component } from '@angular/core';
import { SearchPeoplePage } from '../search-people/search-people';
import { MessagePage } from '../message/message';
import { RequestsPage } from '../requests/requests';
import { LoadingProvider } from '../../providers/loading';
import * as firebase from 'firebase';
import { App } from 'ionic-angular';
import { NewGroupPage } from '../new-group/new-group';
import { DataProvider } from '../../providers/data';
import { GroupPage } from '../group/group';
import { Geolocation } from '@ionic-native/geolocation';
import {  ViewChild, ElementRef } from '@angular/core';
import { mapStyle } from './mapStyle';
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html'
})
export class UserInfoPage {
  private friends: any;
  private friendRequests: any;
  private searchFriend: any;
  private user: any;
  private userId: any;
  private requestsSent: any;
  private alert: any;
  private groups: any;
  private searchGroup: any;
  private updateDateTime: any;
  map: any;
  
  // UserInfoPage
  // This is the page where the user can view user information, and do appropriate actions based on their relation to the current logged in user.
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public modalCtrl: ModalController, 
    public dataProvider: DataProvider,
    public loadingProvider: LoadingProvider,
     public alertCtrl: AlertController,
      public firebaseProvider: FirebaseProvider,
      public app: App,
      public geolocation: Geolocation, 
    
    
    ) { }

  ionViewDidLoad() {

    this.searchGroup = '';
    this.loadingProvider.show();
    this.searchFriend = '';
    this.loadingProvider.show();
    this.dataProvider.getRequests(firebase.auth().currentUser.uid).subscribe((requests) => {
      this.friendRequests = requests.friendRequests;
    });
    this.userId = this.navParams.get('userId');
    this.loadingProvider.show();
    // Get user info.
    this.dataProvider.getUser(this.userId).subscribe((user) => {
      this.user = user;
      this.loadingProvider.hide();
    });
    // Get friends of current logged in user.
    this.dataProvider.getUser(firebase.auth().currentUser.uid).subscribe((user) => {
      this.friends = user.friends;
    });
    // Get requests of current logged in user.
    this.dataProvider.getRequests(firebase.auth().currentUser.uid).subscribe((requests) => {
      this.friendRequests = requests.friendRequests;
      this.requestsSent = requests.requestsSent;
    });


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
  

  // Back
  

  // Enlarge user's profile image.
  enlargeImage(img) {
    let imageModal = this.modalCtrl.create(ImageModalPage, { img: img });
    imageModal.present();
  }

  // Accept friend request.
  acceptFriendRequest() {
    this.alert = this.alertCtrl.create({
      title: 'Confirm Friend Request',
      message: 'Do you want to accept <b>' + this.user.name + '</b> as your friend?',
      buttons: [
        {
          text: 'Cancel',
          handler: data => { }
        },
        {
          text: 'Accept',
          handler: () => {
            this.firebaseProvider.acceptFriendRequest(this.userId);
          }
        }
      ]
    }).present();
  }

  // Deny friend request.
  rejectFriendRequest() {
    this.alert = this.alertCtrl.create({
      title: 'Reject Friend Request',
      message: 'Do you want to reject <b>' + this.user.name + '</b> as your friend?',
      buttons: [
        {
          text: 'Cancel',
          handler: data => { }
        },
        {
          text: 'Reject',
          handler: () => {
            this.firebaseProvider.deleteFriendRequest(this.userId);
          }
        }
      ]
    }).present();
  }

  // Cancel friend request sent.
  cancelFriendRequest() {
    this.alert = this.alertCtrl.create({
      title: 'Friend Request Pending',
      message: 'Do you want to delete your friend request to <b>' + this.user.name + '</b>?',
      buttons: [
        {
          text: 'Cancel',
          handler: data => { }
        },
        {
          text: 'Delete',
          handler: () => {
            this.firebaseProvider.cancelFriendRequest(this.userId);
          }
        }
      ]
    }).present();
  }

  // Send friend request.
  sendFriendRequest() {
    this.alert = this.alertCtrl.create({
      title: 'Send Friend Request',
      message: 'Do you want to send friend request to <b>' + this.user.name + '</b>?',
      buttons: [
        {
          text: 'Cancel',
          handler: data => { }
        },
        {
          text: 'Send',
          handler: () => {
            this.firebaseProvider.sendFriendRequest(this.userId);
          }
        }
      ]
    }).present();
  }

  // Open chat with this user.
  sendMessage() {
    this.navCtrl.push(MessagePage, { userId: this.userId });
  }

  // Check if user can be added, meaning user is not yet friends nor has sent/received any friend requests.
  canAdd() {
    if (this.friendRequests) {
      if (this.friendRequests.indexOf(this.userId) > -1) {
        return false;
      }
    }
    if (this.requestsSent) {
      if (this.requestsSent.indexOf(this.userId) > -1) {
        return false;
      }
    }
    if (this.friends) {
      if (this.friends.indexOf(this.userId) > -1) {
        return false;
      }
    }
    return true;
  }
}
