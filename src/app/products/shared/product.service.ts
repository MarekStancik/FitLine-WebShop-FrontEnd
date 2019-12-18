import { Injectable } from '@angular/core';
import { Observable,of, pipe } from 'rxjs';
import { ProductModel } from '../product.model';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ProductDto } from '../product-dto';
import { ProductsFilter } from './products-filter';
import { AuthService } from 'src/app/shared/auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': 'token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private productsUrl: string;

  constructor(private _http: HttpClient,private authService: AuthService) {
    this.productsUrl = environment.apiUrl + "/products";
  }

  

  getAll(filter: ProductsFilter): Observable<ProductDto[]>{
    if(filter === null)
      return this._http.get<ProductDto[]>(this.productsUrl);
    else
    {
      let url = `${this.productsUrl}?categoryId=${filter.categoryId}&pageSize=${filter.pageSize}&currentPage=${filter.currentPage}&minPrice=${filter.minPrice}&maxPrice=${filter.maxPrice}&ordering=${filter.ordering}`;
      if(filter.suppliers)
      {
        filter.suppliers.forEach(sup => url = url + "&suppliers=" + sup);
      }
      console.log(url);
      return this._http.get<ProductDto[]>(url);
    }
  }

  getById(id: number): Observable<ProductModel>{
    return this._http.get<ProductModel>(this.productsUrl + '/' + id);
  }

  prepareHeaders(){
    httpOptions.headers = httpOptions.headers.set('Authorization','Bearer ' + this.authService.getToken());
  }

  create(Product: ProductModel):Observable<any>{
    this.prepareHeaders();
    return this._http.post<ProductModel>(this.productsUrl,Product,httpOptions);
  }

  update(Product:ProductModel): Observable<any>{
    this.prepareHeaders();
    return this._http.put<ProductModel>(this.productsUrl + '/' + Product.id,Product,httpOptions);
  }

  delete(Product: ProductModel): Observable<any>{
    this.prepareHeaders();
    const url = this.productsUrl + '/' + Product.id;
    return this._http.delete(url,httpOptions);
  }
  
}
