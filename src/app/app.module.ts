import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonsModule } from 'ngx-bootstrap';
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
    RegisterViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot()
  ],
  entryComponents:[
    LoginViewComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
