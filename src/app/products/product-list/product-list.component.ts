import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { switchMap, filter } from 'rxjs/operators';
import { BasketService } from 'src/app/basket/basket.service';
import { ProductCategory } from '../product-category';
import { ProductDto } from '../product-dto';
import { SupplierDto } from 'src/app/suppliers/supplier-dto';
import { CategoryService } from 'src/app/shared/category.service';
import { of } from 'rxjs';
import { ProductsFilter, ProductOrdering } from '../shared/products-filter';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  //Flag that signals the way of ordering products
  private _ordering: ProductOrdering;

  //Price to filter from
  private _priceFrom: number;

  //Price to filter to
  private _priceTo: number;

  //All products
  products: ProductDto[];

  //Products that are filtered based on filters and are shown on the page
  //filteredProducts: ProductDto[];

  //Map that holds names of the brands and whether they should be filtered or nah
  brandFilter: Map<SupplierDto,boolean>;

  //Maximum allowed rating of product
  maxRating = 5;

  //Number of currently openede page
  currentPage = 1;

  itemsPerPage = 12;

  currentCategory: ProductCategory;

  constructor(
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private _basketService: BasketService,
    private _route: ActivatedRoute) { }

  ngOnInit() {
    this.refreshValues();

    this._categoryService.getCurrentCategory(this._route)
      .subscribe(cat => {
        this.refreshValues();
        this.currentCategory = cat;
        this.loadProducts();
      });
  }

  private refreshValues()
  {
    this._priceFrom = 0;
    this._priceTo = 0;
    this._ordering = ProductOrdering.Rating;
    this.currentCategory = null;
    this.currentPage = 1;
    this.products = null;
    this.brandFilter = null;
  }

  private loadProducts()
  {
    this._productService.getAll(this.getCurrentFilter())
      .subscribe(products =>{ 
        if(products !== null)
          this.initializeProducts(products);
      });
  }

  private getCurrentFilter():ProductsFilter{
    
    let val: ProductsFilter = {
      categoryId: 0,
      currentPage: this.currentPage,
      maxPrice: this.priceTo,
      minPrice: this.priceFrom,
      pageSize: this.itemsPerPage,
      searchTextName: "",
      suppliers: [],
      ordering: this.ordering
    };

    if(this.currentCategory !== null)
    {
      val.categoryId = this.currentCategory.id;
    }

    if(this.brandFilter && this.brandFilter.size > 0){
      this.brandFilter.forEach((value: boolean, key: SupplierDto) => {
        if(value)
          val.suppliers.push(key.id);
      });
    }

    return val;
  }

  private filterProducts()
  {
    this._productService.getAll(this.getCurrentFilter())
      .subscribe(products =>{ 
        if(products !== null)
        this.products = products;
      });
  }

  private initializeProducts(products: any){
    this.brandFilter = new Map<SupplierDto,boolean>();
    this.products = products;
    this.products.forEach(element => {
      if(element.supplier){
        this.brandFilter.set(element.supplier,false);
      }
    });
    this._priceFrom = Math.min(...products.map(o => o.price));
    this._priceTo = Math.max(...products.map(o => o.price),0);
  }

  set ordering(order: ProductOrdering){
    this._ordering = order;
    this.filterProducts();
  }

  get ordering(): ProductOrdering{
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
    return Object.values(ProductOrdering);
  }

  toggleBrandFilter(supplier: SupplierDto){
    for (let it of this.brandFilter.keys()) {
      if(it.id == supplier.id){
        this.brandFilter.set(supplier,!this.brandFilter.get(supplier));
    
        this.filterProducts();
        return;
      }
    }
  }

  
  /*filterProducts(){
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
  }*/

  isFilteringSuppliers(): boolean{
    for (let value of this.brandFilter.values()) {
      if(value)
        return true;
    }
    return false;
  }

  isFilteredSupplier(supplier: SupplierDto): boolean{
    return this.brandFilter.get(supplier);
  }

  pageChanged(event: any){
    this.currentPage = event.page;
    this.itemsPerPage = event.itemsPerPage;
    this.filterProducts();
  }

  addItemToBasket(product: ProductDto){
    this._basketService.addItem(product,1);
  }
}
