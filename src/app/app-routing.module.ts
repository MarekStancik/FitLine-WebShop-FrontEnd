import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { RegisterViewComponent } from './users/register-view/register-view.component';


const routes: Routes = [
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'products/:category', component: ProductListComponent},
  {path: 'register-user', component: RegisterViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
