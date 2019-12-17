import { Injectable } from '@angular/core';
import { ProductCategory } from 'src/app/products/product-category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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
export class CategoryService {

  private CategorysUrl = 'https://localhost:44399/api/Categories';

  constructor(private http: HttpClient,private authService: AuthService) { }

  prepareHeaders(){
    httpOptions.headers = httpOptions.headers.set('Authorization','Bearer ' + this.authService.getToken());
  }

  create(Category: ProductCategory):Observable<ProductCategory>{
    this.prepareHeaders();
    return this.http.post<ProductCategory>(this.CategorysUrl,Category,httpOptions);
  }

  getAll(): Observable<ProductCategory[]>{
    return this.http.get<ProductCategory[]>(this.CategorysUrl);
  }

  getById(id: number): Observable<ProductCategory>{
    const url = this.CategorysUrl + '/' + id;
    return this.http.get<ProductCategory>(url);
  }

  update(Category:ProductCategory): Observable<ProductCategory>{
    this.prepareHeaders();
    return this.http.put<ProductCategory>(this.CategorysUrl + '/' + Category.id,Category);
  }

  delete(Category: ProductCategory): Observable<any>{
    this.prepareHeaders();
    const url = this.CategorysUrl + '/' + Category.id;
    return this.http.delete(url);
  }
}
