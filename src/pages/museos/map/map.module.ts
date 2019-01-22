import { NgModule } from '@angular/core';
import {  museoPage } from './map';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
  declarations: [
    museoPage,
  ],
  imports: [
    IonicPageModule.forChild( museoPage),
  ],
  exports: [
    museoPage
  ]
})
export class museoPageModule {}
