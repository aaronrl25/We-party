import { NgModule } from '@angular/core';
import { museosMarkerPage } from './map-marker';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    museosMarkerPage,
  ],
  imports: [
    IonicPageModule.forChild(museosMarkerPage),
  ],
  exports: [
    museosMarkerPage
  ]
})
export class museosMarkerPageModule {}
