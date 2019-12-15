import { Injectable } from '@angular/core';
import { ProductDto } from '../products/product-dto';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private items: Map<ProductDto,number>;

  private totalAmount = 0;

  constructor() { 
    this.items = new Map<ProductDto,number>();
  }

  addItem(product: ProductDto,count: number)
  {
    let oldProduct = null;
    for (let [key] of this.items) {
      if(key.id === product.id)
      {
        oldProduct = key;
        break;
      }
    }

    if(oldProduct)
    {
      this.items.set(oldProduct,this.items.get(oldProduct).valueOf() + count);
    }
    else
    {
      this.items.set(product,count);
    }

    this.totalAmount += product.price * count;
  } 

  deleteItem(product: ProductDto,count: number)
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

  getItems(): Map<ProductDto,number>{
    return this.items;  
  }

  getTotalAmount(): number{
    return this.totalAmount;
  }
}
