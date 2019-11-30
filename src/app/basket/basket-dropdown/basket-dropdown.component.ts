import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { ProductModel } from 'src/app/products/product.model';

@Component({
  selector: 'app-basket-dropdown',
  templateUrl: './basket-dropdown.component.html',
  styleUrls: ['./basket-dropdown.component.scss']
})
export class BasketDropdownComponent implements OnInit {

  constructor(private basketService: BasketService) { }

  ngOnInit() {

  }

 /* getItems(): ProductModel[]{
    return Array.from(this.basketService.getItems().keys());
  }*/

  getItems(){
    return this.basketService.getItems();
  }

  getTotalPrice(): number{
    return this.basketService.getTotalAmount();
  }

}
