import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productsCategoryFilter'
})
export class ProductsCategoryFilterPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
