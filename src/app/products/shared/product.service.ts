import { Injectable } from '@angular/core';
import { Observable,of, pipe } from 'rxjs';
import { ProductModel } from '../product.model';
import { ProductsCategoryFilterPipe } from 'src/app/products/shared/products-category-filter.pipe';
import { take, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  allProducts: ProductModel[] = [
    {
      id: 1,
      name: 'Isolate whey protein',
      category: 'supplements',
      description: 'really good stuff',
      images: null,
      price: 20.99,
      supplier: 'Scitec',
      rating: 5,
      soldCount: 25
    },
    {
      id: 2,
      name: 'Fat burner',
      category: 'supplements',
      description: 'not a really good stuff',
      images: null,
      price: 16.99,
      supplier: 'Weider',
      rating: 4.5,
      soldCount: 30
    },
    {
      id: 3,
      name: '5 kg dumbell',
      category: 'barbells',
      description: 'easy cheasy',
      images: null,
      price: 10.99,
      supplier: null,
      rating: 3
    },
    {
      id: 4,
      name: 'Amino Acids',
      category: 'supplements',
      description: 'Maybe will make your pepe bigger',
      images: null,
      price: 10.99,
      supplier: 'Weider',
      rating: 4.4,
      soldCount: 1
    },
  ];

  constructor() { 
    for (let index = 5; index < 100; index++) {
      const item = {
        id: index,
        name: 'product ' + index,
        category: 'supplements',
        description: 'Some Mock product',
        images: null,
        price: 10.99 + index,
        supplier: 'supplier ' + (index % 10),
        rating: 4.4,
        soldCount: 1 + index 
      }

      this.allProducts.push(item);
    }
  }

  getAll(): Observable<ProductModel[]>{
    return of(this.allProducts);
  }

  getAllInCategory(category: string): Observable<ProductModel[]>{
    var myval: ProductModel[] = [];
    this.allProducts.forEach(element => {
      if(element.category.toLocaleLowerCase() === category.toLocaleLowerCase())
        myval.push(element);
    });
    return of(myval);
  }

  getById(id: number): Observable<ProductModel>{
    for (let index = 0; index < this.allProducts.length; index++) {
      const element = this.allProducts[index];
      if(element.id === id)
        return of(element);
    }
    return null;
  }
}
