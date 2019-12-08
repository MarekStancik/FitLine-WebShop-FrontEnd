import { Injectable } from '@angular/core';
import { Observable,of, pipe } from 'rxjs';
import { ProductModel } from '../product.model';
import { ProductsCategoryFilterPipe } from 'src/app/products/shared/products-category-filter.pipe';
import { take, filter } from 'rxjs/operators';
import { ProductCategory } from '../product-category';

  namespace Categories{
    export const supplements: ProductCategory = {
      id: 1,
      name: 'supplements',
      parentCategory: null,
      children: []
    };

    export const proteins: ProductCategory = {
      id: 2,
      name: 'proteins',
      parentCategory: supplements,
      children: []
    };

    export const amino: ProductCategory = {
      id: 3,
      name: 'amino acids',
      parentCategory: supplements,
      children: []
    };

    export const fatBurners: ProductCategory = {
      id: 4,
      name: 'fat burners',
      parentCategory: supplements,
      children: []
    };

    export const barbels: ProductCategory = {
      id: 5,
      name: 'barbells',
      parentCategory: null,
      children: []
    }

    export const clothing: ProductCategory = {
      id: 6,
      name: 'clothing',
      parentCategory: null,
      children: []
    }

    export const beefProtein: ProductCategory = {
      id: 7,
      name: 'beef protein',
      parentCategory: proteins,
      children:[]
    }

    export const wheyProtein: ProductCategory = {
      id: 8,
      name: 'whey protein',
      parentCategory: proteins,
      children:[]
    }

    export const machines: ProductCategory = {
      id: 9,
      name: 'machines',
      parentCategory: null,
      children:[]
    }

    export const racks: ProductCategory = {
      id: 10,
      name: 'racks',
      parentCategory: null,
      children:[]
    }
  } // End of Categories namespace

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  allCategories: Set<ProductCategory> = new Set<ProductCategory>([
    Categories.supplements,
    Categories.proteins,
    Categories.amino,
    Categories.fatBurners,
    Categories.barbels,
    Categories.clothing,
    Categories.beefProtein,
    Categories.wheyProtein,
    Categories.machines,
    Categories.racks
  ]);


  allProducts: ProductModel[] = [
    {
      id: 1,
      name: 'Isolate whey protein',
      category: Categories.wheyProtein,
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
      category: Categories.fatBurners,
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
      category: Categories.barbels,
      description: 'easy cheasy',
      images: null,
      price: 10.99,
      supplier: null,
      rating: 3
    },
    {
      id: 4,
      name: 'Amino Acids',
      category: Categories.amino,
      description: 'Maybe will make your pepe bigger and maybe it will make also this text longer because I am trying to see how strangely everything behaves',
      images: null,
      price: 10.99,
      supplier: 'Weider',
      rating: 4.4,
      soldCount: 1
    },
  ];

  private initializeCategories(){
    this.allCategories.forEach(element => {
      if(element.parentCategory)
        element.parentCategory.children.push(element);
    });
  }

  constructor() { 

    this.initializeCategories();

    for (let index = 5; index < 100; index++) {
      const item = {
        id: index,
        name: 'product ' + index,
        category: Categories.supplements,
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

  private getAllInCategoryNotObservable(category: ProductCategory): ProductModel[]
  {
    var myval: ProductModel[] = [];
    
    //Iterate all products to search for category
    this.allProducts.forEach(element => {
      //If category has been found
      if(element.category.id === category.id){
        //Push the element
        myval.push(element);
      }
    });

    
    //Now add all product in children categories of category
    for (let index = 0; index < category.children.length; index++) {
      const children = category.children[index];
      myval = myval.concat(this.getAllInCategoryNotObservable(children));
    }

    return myval;
  }

  getAllInCategory(category: ProductCategory): Observable<ProductModel[]>{
    return of(this.getAllInCategoryNotObservable(category));
  }

  /*getCategoryById(id: number): ProductCategory{
    for (let index = 0; index < Categories.length; index++) {
      const element = Categories[index];
      if(element.id === id)
        return element;
    }
    return null;
  }*/

  getCategoryByName(name: string): ProductCategory{
    
    //Return null in case of empty name
    if(name === null || name === '')
      return null;
    
    //Iterate all categories and find the one with correct name
    for(const item of this.allCategories.values()){
      if(item.name === name)
        return item;
    }
    return null;
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
