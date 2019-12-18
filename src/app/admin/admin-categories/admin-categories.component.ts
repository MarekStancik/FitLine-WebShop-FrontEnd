import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/products/product-Category';
import { FormGroup, FormControl } from '@angular/forms';
import { CategoryService } from './service/Category.service'

@Component({
  selector: 'app-admin-Categories',
  templateUrl: './admin-Categories.component.html',
  styleUrls: ['./admin-Categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {

  Categories: ProductCategory[];
  selectedCategory: ProductCategory;
  isCreating: boolean;

  CategoryForm = new FormGroup({
    
    name: new FormControl('')
    
  });
  constructor(private CategoryService: CategoryService) 
  { 

  }

  ngOnInit() {
    this.refresh();
  }

  /**
   * Refresh the content of the page by loading most current Categories
   * And by seting selected Category to null 
   */
  refresh() {
    this.isCreating = false;
    this.selectedCategory = null;
    this.CategoryService.getAll().subscribe(receivedCategories => this.Categories = receivedCategories);
  }

  /**
   * Sets creating tag to true
   * Reset Category form
   */
  prepareCreate(){
    this.isCreating=true;
    this.selectedCategory = null;
    this.CategoryForm.reset();
  }

  save(){
    const Category = this.CategoryForm.value;
    if(!this.isCreating)
      Category.id = this.selectedCategory.id;
    var subcription = this.isCreating ? this.CategoryService.create(Category) : this.CategoryService.update(Category);
    subcription.subscribe(_ => this.refresh());
  }

  onSelect(Category: ProductCategory){
    this.selectedCategory = Category;
    this.CategoryForm.patchValue({
    
    name: Category.name,
    


    });
  }

  onDelete(Category: ProductCategory){
    this.CategoryService.delete(Category).subscribe(_ => this.refresh());
  }

}
