import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/products/product.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from './service/Product.service'
import { ProductCategory } from 'src/app/products/product-Category';
import { CategoryService } from '../admin-categories/service/Category.service';

@Component({
  selector: 'app-admin-Products',
  templateUrl: './admin-Products.component.html',
  styleUrls: ['./admin-Products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  Products: ProductModel[];
  Categories: ProductCategory[];
  selectedProduct: ProductModel;
  isCreating: boolean;

  ProductForm = new FormGroup({
    
    name: new FormControl(''),
    rating: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
    category: new FormControl('')
    
    
    
  });
  constructor(private ProductService: ProductService, private CategoryService: CategoryService) 
  { 

  }

  ngOnInit() {
    this.refresh();
  }

  /**
   * Refresh the content of the page by loading most current Products
   * And by seting selected Product to null 
   */
  refresh() {
    this.isCreating = false;
    this.selectedProduct = null;
    this.CategoryService.getAll().subscribe(receivedCategories => this.Categories = receivedCategories);
    this.ProductService.getAll().subscribe(receivedProducts => this.Products = receivedProducts);
    
  }

  /**
   * Sets creating tag to true
   * Reset Product form
   */
  prepareCreate(){
    this.isCreating=true;
    this.selectedProduct = null;
    this.ProductForm.reset();
  }

  save(){
    const Product = this.ProductForm.value;
    if(!this.isCreating){
      Product.id = this.selectedProduct.id;
      this.ProductService.update(Product).subscribe(_ => this.refresh());
    }
    else{
      this.ProductService.create(Product).subscribe(_ => this.refresh());
    }
      
    
  }


  
  

  onSelect(Product: ProductModel){
    this.selectedProduct = Product;
    this.ProductForm.patchValue({
    
    name: Product.name,
    rating: Product.rating,
    description: Product.description,
    price: Product.price,
    quantity: Product.quantity,
    category: Product.category


    });
    
  
  }

  onDelete(Product: ProductModel){
    this.ProductService.delete(Product).subscribe(_ => this.refresh());
  }

}
