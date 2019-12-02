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

  deleteItem(product: ProductModel,count: number)
  {
    const item = this.items.get(product);
    const difference = item.valueOf() - count;
    if(count === 0 || difference === 0) //We can completely remove the product
    {
      this.totalAmount -= this.items.get(product).valueOf() * product.price;
      this.items.delete(product);
    }
    else //Just decrement count
    {
      this.totalAmount -= product.price;
      this.items.set(product,item.valueOf() -1);
    }
  }

  getItems(): Map<ProductModel,number>{
    return this.items;  
  }

  getTotalAmount(): number{
    return this.totalAmount;
  }
}
