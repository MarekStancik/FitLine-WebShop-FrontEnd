import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-basket-view',
  templateUrl: './basket-view.component.html',
  styleUrls: ['./basket-view.component.scss']
})
export class BasketViewComponent implements OnInit {

  constructor(private basketService: BasketService,private _location: Location) { }

  ngOnInit() {
  }

  getItems(){
    return this.basketService.getItems();
  }

  decrementItem(item: any){
    this.basketService.deleteItem(item,1);
  }

  incrementItem(item: any){
    this.basketService.addItem(item,1);
  }

  deleteItem(item:any){
    this.basketService.deleteItem(item,0);
  }

  getTotalPrice():number{
    return this.basketService.getTotalAmount();
  }

  goBack(){
    this._location.back();
  }
}
