import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productsOrderbyName'
})
export class ProductsOrderbyNamePipe implements PipeTransform {
    transform(text: string): string {
      return text.replace(/([A-Z])/g, ' $1').trim();
    }
}
