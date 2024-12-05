import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpSupportPageRoutingModule } from './help-support-routing.module';

import { HelpSupportPage } from './help-support.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpSupportPageRoutingModule,
    RouterModule
  ],
  declarations: [HelpSupportPage]
})
export class HelpSupportPageModule {}
