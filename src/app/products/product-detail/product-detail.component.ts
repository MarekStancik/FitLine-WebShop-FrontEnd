import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from '../product.model';
import { switchMap } from 'rxjs/operators';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: ProductModel;

  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _basketService: BasketService) { }

  ngOnInit() {
    this._route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this._productService.getById(Number.parseInt(params.get('id'))))
    )
    .subscribe(product => this.product = product);
  }

  addItemToBasket(product: ProductModel){
    this._basketService.addItem(product,1);
  }
}
