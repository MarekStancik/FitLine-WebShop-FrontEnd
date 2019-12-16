import { Injectable } from '@angular/core';
import { Observable,of, pipe } from 'rxjs';
import { ProductModel } from '../product.model';
import { ProductsCategoryFilterPipe } from 'src/app/products/shared/products-category-filter.pipe';
import { take, filter } from 'rxjs/operators';
import { ProductCategory } from '../product-category';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ProductDto } from '../product-dto';
import { ProductsFilter } from './products-filter';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
/*
  private initializeCategories(){
    this.allCategories.forEach(element => {
      if(element.parentCategory)
        element.parentCategory.children.push(element);
    });
  }*/

  private productsUrl: string;

  constructor(private _http: HttpClient) {
    this.productsUrl = environment.apiUrl + "/product";
  }

  getAll(filter: ProductsFilter): Observable<ProductDto[]>{
    if(filter === null)
      return this._http.get<ProductDto[]>(this.productsUrl);
    else
    {
      let url = `${this.productsUrl}?categoryId=${filter.categoryId}&pageSize=${filter.pageSize}&currentPage=${filter.currentPage}&minPrice=${filter.minPrice}&maxPrice=${filter.maxPrice}`;
      if(filter.suppliers)
      {
        filter.suppliers.forEach(sup => url = url + "&suppliers=" + sup);
      }
      return this._http.get<ProductDto[]>(url);
    }
  }

  getById(id: number): Observable<ProductModel>{
    return this._http.get<ProductModel>(this.productsUrl + '/' + id);
  }
}
