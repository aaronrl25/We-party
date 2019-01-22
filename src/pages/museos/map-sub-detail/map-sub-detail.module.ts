import { NgModule } from '@angular/core';
import { museosSubDetailPage } from './map-sub-detail';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    museosSubDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(museosSubDetailPage),
  ],
  exports: [
    museosSubDetailPage
  ]
})
export class museosSubDetailPageModule {}
