import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductDto } from '../product-dto';
import { ProductsFilter } from '../shared/products-filter';

@Component({
  selector: 'app-products-search-bar',
  templateUrl: './products-search-bar.component.html',
  styleUrls: ['./products-search-bar.component.scss']
})
export class ProductsSearchBarComponent implements OnInit {
  allProducts: ProductDto[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
      //Load all products for search bar
      this.productService.getAll(null)
      .pipe(
        catchError(err => {
          console.log(err);
          return of([]);
        })
      )
      .subscribe(products => this.allProducts = products);
  }

}
