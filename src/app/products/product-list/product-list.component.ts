import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../product.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { switchMap, filter } from 'rxjs/operators';
import { BasketService } from 'src/app/basket/basket.service';

enum OrderBy
{
  Sales = "Most Sold",
  Rating = "Top Rated",
  PriceDesc = "Most Expensive",
  PriceAsc = "Least Expensive",
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  //Flag that signals the way of ordering products
  private _ordering: OrderBy;

  //Price to filter from
  private _priceFrom: number;

  //Price to filter to
  private _priceTo: number;

  //All products
  products: ProductModel[];

  //Products that are filtered based on filters and are shown on the page
  filteredProducts: ProductModel[];

  //Map that holds names of the brands and whether they should be filtered or nah
  brandFilter: Map<string,boolean>;

  //Maximum allowed rating of product
  maxRating = 5;

  //Number of currently openede page
  currentPage = 1;

  itemsPerPage = 12;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private basketService: BasketService) { }

  ngOnInit() {
    this.brandFilter = new Map<string,boolean>();
    this._priceFrom = 0;
    this._priceTo = 0;

    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
           params.get('category') 
            ? this.productService.getAllInCategory(params.get('category')) 
            : this.productService.getAll())
      )
      .subscribe(products =>{ 
        this.products = products;
        this.products.forEach(element => {
          if(element.supplier){
            this.brandFilter.set(element.supplier,false);
          }
        });
        this._priceFrom = Math.min(...products.map(o => o.price));
        this._priceTo = Math.max(...products.map(o => o.price),0);
        this.filterProducts();
      });

    this._ordering = OrderBy.Rating;
  }

  set ordering(order: OrderBy){
    this._ordering = order;
    this.orderProducts(this.filteredProducts,order);
  }

  get ordering(): OrderBy{
    return this._ordering;
  }

  set priceTo(price: number){
    this._priceTo = price;
    this.filterProducts();
  }

  get priceTo(): number{
    return this._priceTo;
  }

  set priceFrom(price: number){
    this._priceFrom = price;
    this.filterProducts();
  }

  get priceFrom(): number{
    return this._priceFrom;
  }

  orderValues(): Array<string>{
    return Object.values(OrderBy);
  }

  toggleBrandFilter(brand: string){
    this.brandFilter.set(brand,!this.brandFilter.get(brand));
    
    this.filterProducts();
  }

  filterProducts(){
    this.filteredProducts = [];

    const isFilteringSuppliers = this.isFilteringSuppliers();
    this.products.forEach(element => {
      let isOk = true;
      
      if(isFilteringSuppliers && !this.isFilteredSupplier(element.supplier))
        isOk = false;

      if(element.price > this.priceTo || element.price < this.priceFrom)
        isOk = false;

      if(isOk)
        this.filteredProducts.push(element);
    });

    this.orderProducts(this.filteredProducts,this.ordering);
  }

  isFilteringSuppliers(): boolean{
    for (let value of this.brandFilter.values()) {
      if(value)
        return true;
    }
    return false;
  }

  isFilteredSupplier(supplier: string): boolean{
    return this.brandFilter.get(supplier);
  }

  orderProducts(products: ProductModel[],order: OrderBy)
  {
    switch (this.ordering) {
      case OrderBy.PriceAsc:
        products.sort((a1,a2) => a1.price > a2.price ? 1 : a1.price === a2.price ? 0 : -1);
        break;
      case OrderBy.PriceDesc:
        products.sort((a1,a2) => a1.price > a2.price ? -1 : a1.price === a2.price ? 0 : 1);
        break;
      case OrderBy.Rating:
        products.sort((a1,a2) => a1.rating > a2.rating ? -1 : a1.rating === a2.rating ? 0 : 1);
        break;
      case OrderBy.Sales:
        products.sort((a1,a2) => a1.soldCount > a2.soldCount ? -1 : a1.soldCount === a2.soldCount ? 0 : 1)
        break;
      default:
        break;
    }
  }

  pageChanged(event: any){
    this.currentPage = event.page;
    this.itemsPerPage = event.itemsPerPage;
  }

  pagedFilteredProducts(): ProductModel[]{
    return this.filteredProducts.slice((this.currentPage-1) * this.itemsPerPage,this.currentPage * this.itemsPerPage);
  }

  addItemToBasket(product: ProductModel){
    this.basketService.addItem(product,1);
  }
}
