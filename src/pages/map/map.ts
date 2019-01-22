import { identifierModuleUrl } from '@angular/compiler/compiler';
import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ActionSheetController, AlertController, App, LoadingController, NavController, Platform, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {  NavParams } from 'ionic-angular';
import { SearchPeoplePage } from '../search-people/search-people';
import { UserInfoPage } from '../user-info/user-info';
import { MessagePage } from '../message/message';
import { RequestsPage } from '../requests/requests';
import { DataProvider } from '../../providers/data';
import { LoadingProvider } from '../../providers/loading';
import * as firebase from 'firebase';

import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

declare var google: any;
declare var MarkerClusterer: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  addressElement: HTMLInputElement = null;
  private friends: any;
  private friendRequests: any;
  private searchFriend: any;
  listSearch: string = '';

  map: any;
  marker: any;
  loading: any;
  search: boolean = false;
  error: any;
  switch: string = "map";

  regionals: any = [];
  currentregional: any;

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public app: App,
    public nav: NavController,
    public zone: NgZone,
    public platform: Platform,
    public alertCtrl: AlertController,
    public storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public geolocation: Geolocation,
    public dataProvider: DataProvider,
    public loadingProvider: LoadingProvider
  ) {
    this.platform.ready().then(() => this.loadMaps());
    this.regionals = [{
      }  ];
  }

  viewPlace(id) {
    console.log('Clicked Marker', id);
  }


  loadMaps() {
    if (!!google) {
      this.initializeMap();
      this.getCurrentPosition();

      this.initAutocomplete();
    } else {
      this.errorAlert('Error', 'Something went wrong with the Internet Connection. Please check your Internet.')
    }
  }

  errorAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            this.loadMaps();
          }
        }
      ]
    });
    alert.present();
  }

  mapsSearchBar(ev: any) {
    // set input to the value of the searchbar
    //this.search = ev.target.value;
    console.log(ev);
    const autocomplete = new google.maps.places.Autocomplete(ev);
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          sub.next(place.geometry.location);
          sub.complete();
        }
      });
    });
  }

  initAutocomplete(): void {
    // reference : https://github.com/driftyco/ionic/issues/7223
    this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
    this.createAutocomplete(this.addressElement).subscribe((location) => {
      console.log('Searchdata', location);

      let options = {
        center: location,
        zoom: 10
      };
      this.map.setOptions(options);
      this.addMarker(location, "Mein gesuchter Standort");

    });
  }

  createAutocomplete(addressEl: HTMLInputElement): Observable<any> {
    const autocomplete = new google.maps.places.Autocomplete(addressEl);
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          console.log('Search Lat', place.geometry.location.lat());
          console.log('Search Lng', place.geometry.location.lng());
          sub.next(place.geometry.location);
          //sub.complete();
        }
      });
    });
  }

  initializeMap() {
    this.zone.run(() => {
      var mapEle = this.mapElement.nativeElement;
      this.map = new google.maps.Map(mapEle, {
        zoom: 10,
        center: { lat: 51.165691, lng: 10.451526 },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{"featureType":"all","elementType":"labels.text","stylers":[{"color":"#a1f7ff"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"color":"#000000"},{"lightness":13}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#144b53"},{"lightness":14},{"weight":1.4}]},{"featureType":"administrative","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#a1f7ff"}]},{"featureType":"administrative.province","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#a1f7ff"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#a1f7ff"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#a1f7ff"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#08304b"}]},{"featureType":"landscape","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"labels.text.fill","stylers":[{"color":"#ff0000"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#0c4152"},{"lightness":5}]},{"featureType":"poi.attraction","elementType":"labels","stylers":[{"invert_lightness":true}]},{"featureType":"poi.attraction","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#a1f7ff"}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"invert_lightness":true}]},{"featureType":"poi.park","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#a1f7ff"}]},{"featureType":"road","elementType":"labels.text","stylers":[{"color":"#a1f7ff"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#0b434f"},{"lightness":25}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"lightness":"0"},{"saturation":"0"},{"invert_lightness":true},{"visibility":"simplified"},{"hue":"#00e9ff"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"visibility":"simplified"},{"color":"#a1f7ff"}]},{"featureType":"road.highway.controlled_access","elementType":"labels.text","stylers":[{"color":"#a1f7ff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#0b3d51"},{"lightness":16}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"invert_lightness":true}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"simplified"},{"invert_lightness":true}]},{"featureType":"transit","elementType":"all","stylers":[{"color":"#146474"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#021019"}]}]
,
        disableDoubleClickZoom: false,
        disableDefaultUI: true,
        zoomControl: true,
        scaleControl: true,
      });

      let markers = [];
      for (let regional of this.regionals) {
        regional.distance = 0;
        regional.visible = false;
        regional.current = false;

        let markerData = {
          position: {
            lat: regional.latitude,
            lng: regional.longitude
          },
          map: this.map,
          title: regional.title,
        };

        regional.marker = new google.maps.Marker(markerData);
        markers.push(regional.marker);

        regional.marker.addListener('click', () => {
          for (let c of this.regionals) {
            c.current = false;
            //c.infoWindow.close();
          }
          this.currentregional = regional;
          regional.current = true;

          regional.infoWindow.open(this.map, regional.marker);
          this.map.panTo(regional.marker.getPosition());
        });
      }

      new MarkerClusterer(this.map, markers, {
        styles: [
          {
            height: 53,
            url: "assets/img/cluster/MapMarkerJS.png",
            width: 53,
            textColor: '#fff'
          },
          {
            height: 56,
            url: "assets/img/cluster/MapMarkerJS.png",
            width: 56,
            textColor: '#fff'
          },
          {
            height: 66,
            url: "assets/img/cluster/MapMarkerJS.png",
            width: 66,
            textColor: '#fff'
          },
          {
            height: 78,
            url: "assets/img/cluster/MapMarkerJS.png",
            width: 78,
            textColor: '#fff'
          },
          {
            height: 90,
            url: "assets/img/cluster/MapMarkerJS.png",
            width: 90,
            textColor: '#fff'
          }
        ]
      });




      google.maps.event.addListenerOnce(this.map, 'idle', () => {
        google.maps.event.trigger(this.map, 'resize');
        mapEle.classList.add('show-map');
        this.bounceMap(markers);
        this.getCurrentPositionfromStorage(markers)
      });

      google.maps.event.addListener(this.map, 'bounds_changed', () => {
        this.zone.run(() => {
          this.resizeMap();
        });
      });


    });
  }

  //Center zoom
  //http://stackoverflow.com/questions/19304574/center-set-zoom-of-map-to-cover-all-visible-markers
  bounceMap(markers) {
    let bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
    }

    this.map.fitBounds(bounds);
  }

  resizeMap() {
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
    }, 200);
  }

  getCurrentPositionfromStorage(markers) {
    this.storage.get('lastLocation').then((result) => {
      if (result) {
        let myPos = new google.maps.LatLng(result.lat, result.long);
        this.map.setOptions({
          center: myPos,
          zoom: 14
        });
        let marker = this.addMarker(myPos, "My last saved Location: " + result.location);

        markers.push(marker);
        this.bounceMap(markers);

        this.resizeMap();
      }
    });
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  choosePosition() {
    this.storage.get('lastLocation').then((result) => {
      if (result) {
        let actionSheet = this.actionSheetCtrl.create({
          title: 'Last Location: ' + result.location,
          buttons: [
            {
              text: 'Reload',
              handler: () => {
                this.getCurrentPosition();
              }
            },
            {
              text: 'Delete',
              handler: () => {
                this.storage.set('lastLocation', null);
                this.showToast('Location deleted!');
                this.initializeMap();
              }
            },
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
              }
            }
          ]
        });
        actionSheet.present();
      } else {
        this.getCurrentPosition();

      }
    });
  }

  // go show currrent location
  getCurrentPosition() {
    this.loading = this.loadingCtrl.create({
      content: 'Searching Location ...'
    });
    this.loading.present();

    let locationOptions = { timeout: 10000, enableHighAccuracy: true };

    this.geolocation.getCurrentPosition(locationOptions).then(
      (position) => {
        this.loading.dismiss().then(() => {

          this.showToast('Location found!');

          console.log(position.coords.latitude, position.coords.longitude);
          let myPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          let options = {
            center: myPos,
            zoom: 14
          };
          this.map.setOptions(options);
          this.addMarker(myPos, "");

          // let alert = this.alertCtrl.create({
          //   title: 'Location',
          //   message: 'Do you want to save the Location?',
          //   buttons: [
          //     {
          //       text: 'Cancel'
          //     },
          //     {
          //       text: 'Save',
          //       handler: data => {
          //         let lastLocation = { lat: position.coords.latitude, long: position.coords.longitude };
          //         console.log(lastLocation);
          //         this.storage.set('lastLocation', lastLocation).then(() => {
          //           this.showToast('Location saved');
          //         });
          //       }
          //     }
          //   ]
          // });
          // alert.present();

        });
      },
      (error) => {
        this.loading.dismiss().then(() => {
          this.showToast('Location not found. Please enable your GPS!');

          console.log(error);
        });
      }
    )
  }

  toggleSearch() {
    if (this.search) {
      this.search = false;
    } else {
      this.search = true;
    }
  }

  addMarker(position, content) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: position
    });

    this.addInfoWindow(marker, content);
    return marker;
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
  ionViewDidLoad() {
    // Initialize
    this.searchFriend = '';
    this.loadingProvider.show();

    // Get friendRequests to show friendRequests count.
    this.dataProvider.getRequests(firebase.auth().currentUser.uid).subscribe((requests) => {
      this.friendRequests = requests.friendRequests;
    });

    // Get user data on database and get list of friends.
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



