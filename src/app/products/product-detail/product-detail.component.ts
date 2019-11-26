import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from '../product.model';
import { switchMap } from 'rxjs/operators';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: ProductModel;

  constructor(private productService: ProductService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.productService.getById(Number.parseInt(params.get('id'))))
    )
    .subscribe(product => this.product = product);
  }

}
