import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccInfoPageRoutingModule } from './acc-info-routing.module';

import { AccInfoPage } from './acc-info.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccInfoPageRoutingModule,
    RouterModule
  ],
  declarations: [AccInfoPage]
})
export class AccInfoPageModule {}
