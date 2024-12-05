import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressInfoPage } from './address-info.page';

const routes: Routes = [
  {
    path: '',
    component: AddressInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddressInfoPageRoutingModule {}
