import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/products/product.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from './service/Product.service'

@Component({
  selector: 'app-admin-Products',
  templateUrl: './admin-Products.component.html',
  styleUrls: ['./admin-Products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  Products: ProductModel[];
  selectedProduct: ProductModel;
  isCreating: boolean;

  ProductForm = new FormGroup({
    
    name: new FormControl(''),
    rating: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl('')
    
    
    
  });
  constructor(private ProductService: ProductService) 
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
    if(!this.isCreating)
      Product.id = this.selectedProduct.id;
    var subcription = this.isCreating ? this.ProductService.create(Product) : this.ProductService.update(Product);
    subcription.subscribe(_ => this.refresh());
  }

  onSelect(Product: ProductModel){
    this.selectedProduct = Product;
    this.ProductForm.patchValue({
    
    name: Product.name,
    rating: Product.rating,
    description: Product.description,
    price: Product.price,
    quantity: Product.quantity,


    });
  }

  onDelete(Product: ProductModel){
    this.ProductService.delete(Product).subscribe(_ => this.refresh());
  }

}
