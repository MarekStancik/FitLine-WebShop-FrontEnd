import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/products/product.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductCategory } from 'src/app/products/product-Category';
import { CategoryService } from '../../shared/category.service'
import { ProductService } from '../../products/shared/product.service'
import { ProductDto } from 'src/app/products/product-dto';
import { SupplierDto } from 'src/app/suppliers/supplier-dto';
import { SupplierService } from 'src/app/suppliers/supplier.service';

@Component({
  selector: 'app-admin-Products',
  templateUrl: './admin-Products.component.html',
  styleUrls: ['./admin-Products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  Products: ProductDto[];
  Categories: ProductCategory[];
  suppliers: SupplierDto[];
  selectedProduct: ProductModel;
  isCreating: boolean;

  ProductForm = new FormGroup({
    
    name: new FormControl(''),
    rating: new FormControl(0),
    description: new FormControl(''),
    price: new FormControl(0),
    amount: new FormControl(0),
    category: new FormControl(0),
    supplier: new FormControl(0)
    
    
    
  });
  constructor(private _productService: ProductService, 
    private _categoryService: CategoryService,
    private _supplierService: SupplierService) 
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
    this._categoryService.getAll().subscribe(receivedCategories => this.Categories = receivedCategories);
    this._productService.getAll(null).subscribe(receivedProducts => this.Products = receivedProducts);
    this._supplierService.getAll().subscribe(receivedSubs => this.suppliers = receivedSubs);
    
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

  getCatById(id: number): ProductCategory{
    let rval;
    this.Categories.forEach(cat =>{ if(cat.id === id) rval = cat;});
    return rval;
  }

  getSupplierById(id: number): SupplierDto{
    let rval;
    this.suppliers.forEach(sup =>{ if(sup.id === id) rval = sup;});
    return rval;
  }

  save(){
    const formValues = this.ProductForm.value;
    let product: ProductModel = {
      id: this.selectedProduct ? this.selectedProduct.id: 0,
      amount: formValues.amount,
      category: this.getCatById(Number(formValues.category)),
      description: formValues.description,
      document: '',
      images: null,
      name: formValues.name,
      price: formValues.price,
      rating: formValues.rating,
      supplier: this.getSupplierById(Number(formValues.supplier))
    };

    var subcription = this.isCreating ? this._productService.create(product) : this._productService.update(product);
    subcription.subscribe(_ => this.refresh());
  }

  onSelect(product: ProductDto){
    this.isCreating = false;
    this._productService.getById(product.id)
      .subscribe(prod => {
        this.selectedProduct = prod;
        this.ProductForm.patchValue({
    
          name: prod.name,
          rating: prod.rating,
          description: prod.description,
          price: prod.price,
          amount: prod.amount,
          category: prod.category.id,
          supplier: prod.supplier ? prod.supplier.id : 0      
      
          });
      }); 
  
  }

  onDelete(Product: ProductModel){
    this._productService.delete(Product).subscribe(_ => this.refresh());
  }

}
