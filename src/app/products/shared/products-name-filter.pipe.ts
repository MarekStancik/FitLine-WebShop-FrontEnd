import { Pipe, PipeTransform } from '@angular/core';
import { ProductModel } from '../product.model';

@Pipe({
  name: 'productsNameFilter'
})
export class ProductsNameFilterPipe implements PipeTransform {

  transform(items: ProductModel[], searchText: string): any[] {

    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.name.toLocaleLowerCase().includes(searchText);
    });
  }

}
