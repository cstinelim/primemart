import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddressInfoPageRoutingModule } from './address-info-routing.module';

import { AddressInfoPage } from './address-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddressInfoPageRoutingModule
  ],
  declarations: [AddressInfoPage]
})
export class AddressInfoPageModule {}
