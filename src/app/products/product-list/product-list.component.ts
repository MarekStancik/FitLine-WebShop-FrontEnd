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
  products: ProductDto[];

  //Products that are filtered based on filters and are shown on the page
  filteredProducts: ProductDto[];

  //Map that holds names of the brands and whether they should be filtered or nah
  brandFilter: Map<SupplierDto,boolean>;

  //Maximum allowed rating of product
  maxRating = 5;

  //Number of currently openede page
  currentPage = 1;

  itemsPerPage = 12;

  currentCategory: ProductCategory;

  constructor(
    private _route: ActivatedRoute,
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private _basketService: BasketService) { }

  ngOnInit() {
    this.refreshValues();

    this._route.paramMap
      .pipe(
        //Switch map to obtain category from query parameters
        switchMap((params: ParamMap) =>{
            this.refreshValues();
            //try to get category
            const category = params.get('category');
            
            //If there was an category obtain products in the category
            if(category)
            {
              this._categoryService.getByName(category)
                .subscribe(cat => {
                  if(cat){
                  this.currentCategory = cat;
                  this._productService.getAllInCategory(this.currentCategory)
                    .subscribe(products =>{ 
                      if(products !== null)
                        this.initializeProducts(products);
                    });
                  }
                })
            }
            else //Else just get all products
            {
              this.currentCategory = null;
              this._categoryService.getAll()
                .subscribe(cats =>{
                  this.currentCategory = {
                    name: 'All Products',
                    id: 0,
                    parentCategory: null,
                    children: cats
                   };
                });
              return this._productService.getAll();
            }
            
            //return null here so subcribe callback will know
            //there is no products yet in case of getting category producst
            return of(null);
        })
      )
      .subscribe(products =>{ 
        if(products !== null)
          this.initializeProducts(products);
      });
  }

  private refreshValues()
  {
    this._priceFrom = 0;
    this._priceTo = 0;
    this._ordering = OrderBy.Rating;
    this.currentCategory = null;
    this.currentPage = 1;
    this.filteredProducts = null;
    this.products = null;
    this.brandFilter = null;
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
    this.filterProducts();
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

  toggleBrandFilter(supplier: SupplierDto){
    for (let it of this.brandFilter.keys()) {
      if(it.id == supplier.id){
        this.brandFilter.set(supplier,!this.brandFilter.get(supplier));
    
        this.filterProducts();
        return;
      }
    }
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

  isFilteredSupplier(supplier: SupplierDto): boolean{
    return this.brandFilter.get(supplier);
  }

  orderProducts(products: ProductDto[],order: OrderBy)
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
      //  products.sort((a1,a2) => a1.soldCount > a2.soldCount ? -1 : a1.soldCount === a2.soldCount ? 0 : 1)
        break;
      default:
        break;
    }
  }

  pageChanged(event: any){
    this.currentPage = event.page;
    this.itemsPerPage = event.itemsPerPage;
  }

  pagedFilteredProducts(): ProductDto[]{
    return this.filteredProducts.slice((this.currentPage-1) * this.itemsPerPage,this.currentPage * this.itemsPerPage);
  }

  addItemToBasket(product: ProductDto){
    this._basketService.addItem(product,1);
  }
}
