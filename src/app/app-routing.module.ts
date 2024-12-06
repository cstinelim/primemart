import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupPageModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'acc-info',
    loadChildren: () =>
      import('./account/acc-info/acc-info.module').then(
        (m) => m.AccInfoPageModule
      ),
  },
  {
    path: 'address-info',
    loadChildren: () =>
      import('./account/address-info/address-info.module').then(
        (m) => m.AddressInfoPageModule
      ),
  },
  {
    path: 'payment-method',
    loadChildren: () =>
      import('./account/payment-method/payment-method.module').then(
        (m) => m.PaymentMethodPageModule
      ),
  },
  {
    path: 'referral',
    loadChildren: () =>
      import('./referral/referral.module').then((m) => m.ReferralPageModule),
  },
  {
    path: 'help-support',
    loadChildren: () =>
      import('./help-support/help-support.module').then(
        (m) => m.HelpSupportPageModule
      ),
  },
  {
    path: 'about-us',
    loadChildren: () =>
      import('./about-us/about-us.module').then((m) => m.AboutUsPageModule),
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'order-details/:id',
    loadChildren: () => import('./order-details/order-details.module').then( m => m.OrderDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
