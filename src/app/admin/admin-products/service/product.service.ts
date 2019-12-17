import { Injectable } from '@angular/core';
import { ProductModel } from 'src/app/products/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';
import { environment } from '../../../../environments/environment';

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

  
  
private ProductsUrl = environment.apiUrl + "/products";

  constructor(private http: HttpClient,private authService: AuthService) { }

  prepareHeaders(){
    httpOptions.headers = httpOptions.headers.set('Authorization','Bearer ' + this.authService.getToken());
  }

  create(Product: ProductModel):Observable<ProductModel>{
    this.prepareHeaders();
    return this.http.post<ProductModel>(this.ProductsUrl,Product,httpOptions);
  }

  getAll(): Observable<ProductModel[]>{
    return this.http.get<ProductModel[]>(this.ProductsUrl);
  }

  getById(id: number): Observable<ProductModel>{
    const url = this.ProductsUrl + '/' + id;
    return this.http.get<ProductModel>(url);
  }

  update(Product:ProductModel): Observable<ProductModel>{
    this.prepareHeaders();
    return this.http.put<ProductModel>(this.ProductsUrl + '/' + Product.id,Product);
  }

  delete(Product: ProductModel): Observable<any>{
    this.prepareHeaders();
    const url = this.ProductsUrl + '/' + Product.id;
    return this.http.delete(url);
  }
}
