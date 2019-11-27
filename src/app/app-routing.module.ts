import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { RegisterViewComponent } from './users/register-view/register-view.component';
import { UserOrdersViewComponent } from './users/user-orders-view/user-orders-view.component';
import { UserNewsSubsComponent } from './users/user-profile-view/user-news-subs/user-news-subs.component';
import { UserDetailsComponent } from './users/user-profile-view/user-details/user-details.component';
import { UserBillingAddressComponent } from './users/user-profile-view/user-billing-address/user-billing-address.component';
import { UserDiscountsComponent } from './users/user-profile-view/user-discounts/user-discounts.component';


const routes: Routes = [
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'products/:category', component: ProductListComponent},
  {path: 'register-user', component: RegisterViewComponent},
  {path: 'user-profile', redirectTo: 'user-profile/details', pathMatch: 'full' },
  {path: 'user-profile/details',component: UserDetailsComponent},
  {path: 'user-profile/address',component: UserBillingAddressComponent},
  {path: 'user-profile/subs',component: UserNewsSubsComponent},
  {path: 'user-profile/cards',component: UserDiscountsComponent},
  {path: 'user-orders',component: UserOrdersViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
