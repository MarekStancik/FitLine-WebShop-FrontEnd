import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ProductCategory } from '../products/product-category';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl: string;

  constructor(private _http: HttpClient) 
  { 
    this.categoryUrl = environment.apiUrl + '/category';
  }

  private getDefaultCategory(): Observable<ProductCategory>{
    return this.getAll()
      .pipe(
        catchError(err =>{
          console.error(err);
          
          return of([]);
        }),
        map(data => {
          let rval: ProductCategory = {
            children: null,
            id: 0,
            name: 'All Products',
            parentCategory: null
          };

          if(data)
            rval.children = data;
          return rval;
      }));
  }

  getByName(name: string): Observable<ProductCategory>{
    return this._http.get<ProductCategory>(this.categoryUrl + '/' + name)
      .pipe(
        catchError(err => {
          console.error(err);
          return this.getDefaultCategory()
        })
      );
  }

  getAll(): Observable<ProductCategory[]>{
    return this._http.get<ProductCategory[]>(this.categoryUrl);
  }

  getCurrentCategory(route: ActivatedRoute): Observable<ProductCategory>{
    return route.paramMap
      .pipe(
        //Switch map to obtain category from query parameters
        switchMap((params: ParamMap) =>{
            //try to get category
            const category = params.get('category');
            
            //If there was an category obtain products in the category
            if(category)
            {
              return this.getByName(category);
            }
            else 
            {
              return this.getDefaultCategory();
            }
        })
      );
  }
}
