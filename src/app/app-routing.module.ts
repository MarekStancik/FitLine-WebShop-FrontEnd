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
import { BasketViewComponent } from './basket/basket-view/basket-view.component';
import { PaymentViewComponent } from './payment/payment-view/payment-view.component';
import { UserProfileViewComponent } from './users/user-profile-view/user-profile-view.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminAuthGuard } from './admin/guards/admin-auth-guard';



const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full' },
  {path: 'basket', component: BasketViewComponent},
  {path: 'payment', component: PaymentViewComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'products/:category', component: ProductListComponent},
  {path: 'register-user', component: RegisterViewComponent},
  {path: 'user-profile/:section', component: UserProfileViewComponent},
  {path: 'user-profile', redirectTo: 'user-profile/details', pathMatch: 'full' },
  /*{path: 'user-profile/details',component: UserDetailsComponent},
  {path: 'user-profile/address',component: UserBillingAddressComponent},
  {path: 'user-profile/subs',component: UserNewsSubsComponent},
  {path: 'user-profile/cards',component: UserDiscountsComponent},*/
  {path: 'user-orders',component: UserOrdersViewComponent},
  { path: 'adminlogin', component: AdminLoginComponent},
  { path: 'admin', component: AdminHomeComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/products', component: AdminProductsComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/categories', component: AdminCategoriesComponent, canActivate: [AdminAuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
