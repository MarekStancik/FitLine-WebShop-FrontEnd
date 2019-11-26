import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../product.model';
import { ProductService } from '../shared/product.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-products-search-bar',
  templateUrl: './products-search-bar.component.html',
  styleUrls: ['./products-search-bar.component.scss']
})
export class ProductsSearchBarComponent implements OnInit {
  allProducts: ProductModel[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
      //Load all products for search bar
      this.productService.getAll()
      .pipe(
        catchError(err => {
          console.log(err);
          return of([]);
        })
      )
      .subscribe(products => this.allProducts = products);
  }

}
