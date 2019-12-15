import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonsModule, ProgressbarModule, PaginationModule, CollapseModule } from 'ngx-bootstrap';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { ProductsNameFilterPipe } from './products/shared/products-name-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductsCategoryFilterPipe } from './products/shared/products-category-filter.pipe';
import { UserMenuComponent } from './users/user-menu/user-menu.component';
import { ProductsSearchBarComponent } from './products/products-search-bar/products-search-bar.component';
import { LoginViewComponent } from './users/login-view/login-view.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RegisterViewComponent } from './users/register-view/register-view.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FileUploadComponent } from './shared/file-upload/file-upload.component';
import { UserOrdersViewComponent } from './users/user-orders-view/user-orders-view.component';
import { UserDetailsComponent } from './users/user-profile-view/user-details/user-details.component';
import { UserDiscountsComponent } from './users/user-profile-view/user-discounts/user-discounts.component';
import { UserBillingAddressComponent } from './users/user-profile-view/user-billing-address/user-billing-address.component';
import { UserNewsSubsComponent } from './users/user-profile-view/user-news-subs/user-news-subs.component';
import { UserProfileMenuComponent } from './users/user-profile-view/user-profile-menu/user-profile-menu.component';
import { BasketDropdownComponent } from './basket/basket-dropdown/basket-dropdown.component';
import { BasketViewComponent } from './basket/basket-view/basket-view.component';
import { PaymentViewComponent } from './payment/payment-view/payment-view.component';
import { UserProfileViewComponent } from './users/user-profile-view/user-profile-view.component';
import { QuillModule } from 'ngx-quill'; 
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryBreadcrumbComponent } from './shared/category-breadcrumb/category-breadcrumb.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProductsNameFilterPipe,
    ProductDetailComponent,
    ProductListComponent,
    ProductsCategoryFilterPipe,
    UserMenuComponent,
    ProductsSearchBarComponent,
    LoginViewComponent,
    RegisterViewComponent,
    FileUploadComponent,
    UserOrdersViewComponent,
    UserDetailsComponent,
    UserDiscountsComponent,
    UserBillingAddressComponent,
    UserNewsSubsComponent,
    UserProfileMenuComponent,
    BasketDropdownComponent,
    BasketViewComponent,
    PaymentViewComponent,
    UserProfileViewComponent,
    CategoryBreadcrumbComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    ProgressbarModule.forRoot(),
    PaginationModule.forRoot(),
    QuillModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  entryComponents:[
    LoginViewComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
