import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../product.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: ProductModel[];

  constructor(private route: ActivatedRoute,private productService: ProductService) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.productService.getAllInCategory(params.get('category')))
    )
    .subscribe(products => this.products = products);
  }

}
