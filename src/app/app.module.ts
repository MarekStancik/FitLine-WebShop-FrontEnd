import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonsModule } from 'ngx-bootstrap';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { ProductsNameFilterPipe } from './products/shared/products-name-filter.pipe';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductsCategoryFilterPipe } from './products/shared/products-category-filter.pipe';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProductsNameFilterPipe,
    ProductDetailComponent,
    ProductListComponent,
    ProductsCategoryFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
