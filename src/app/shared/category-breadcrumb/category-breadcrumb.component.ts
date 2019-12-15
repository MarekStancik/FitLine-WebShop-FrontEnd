import { Component, OnInit, Input } from '@angular/core';
import { ProductCategory } from 'src/app/products/product-category';

@Component({
  selector: 'app-category-breadcrumb',
  templateUrl: './category-breadcrumb.component.html',
  styleUrls: ['./category-breadcrumb.component.scss']
})
export class CategoryBreadcrumbComponent implements OnInit {

  @Input() category: ProductCategory;
  @Input() activeLast: boolean;

  constructor() { }

  ngOnInit() {
  }

  getCategoryTree():Array<string>
  {
    if(this.category !== null)
    {
      let cats = new Set<string>([this.category.name]);
      let cat = this.category;
      while(cat.parentCategory)
      {
        cat = cat.parentCategory;
        cats.add(cat.name);
      }
      return Array.from(cats).reverse();
    }
    else
      return null;
  }

}
