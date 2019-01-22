import { NgModule } from '@angular/core';
import { museosDetailPage } from './map-detail';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    museosDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(museosDetailPage),
  ],
  exports: [
    museosDetailPage
  ]
})
export class museosDetailPageModule {}
