import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCategory } from '../products/product-category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl: string;

  constructor(private _http: HttpClient) { 
    this.categoryUrl = environment.apiUrl + '/categories';
  }

  getByName(name: string): Observable<ProductCategory>{
    return this._http.get<ProductCategory>(this.categoryUrl + '/' + name);
  }

  getAll(): Observable<ProductCategory[]>{
    return this._http.get<ProductCategory[]>(this.categoryUrl);
  }
}
