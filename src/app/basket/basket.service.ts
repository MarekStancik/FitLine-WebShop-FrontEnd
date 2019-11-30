import { Injectable } from '@angular/core';
import { ProductModel } from '../products/product.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private items: Map<ProductModel,number>;

  private totalAmount = 0;

  constructor() { 
    this.items = new Map<ProductModel,number>();
  }

  addItem(product: ProductModel,count: number)
  {
    if(this.items.has(product))
    {
      this.items.set(product,this.items.get(product).valueOf() + count);
    }
    else
    {
      this.items.set(product,count);
    }

    this.totalAmount += product.price * count;
  }

  deleteItem(product: ProductModel)
  {
    this.items.delete(product);
    this.totalAmount -= product.price;
  }

  getItems(): Map<ProductModel,number>{
    return this.items;  
  }

  getTotalAmount(): number{
    return this.totalAmount;
  }
}
