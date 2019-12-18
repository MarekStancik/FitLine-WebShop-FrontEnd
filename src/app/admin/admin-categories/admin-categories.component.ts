import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/products/product-Category';
import { FormGroup, FormControl } from '@angular/forms';
import { CategoryService } from '../../shared/category.service'

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
    
    name: new FormControl(''),
    parentCategory: new FormControl()
  });
  constructor(private _categoryService: CategoryService) 
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
    this._categoryService.getAll().subscribe(receivedCategories => this.Categories = receivedCategories);
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

  getCatById(id: number): ProductCategory{
    let rval;
    this.Categories.forEach(cat =>{ if(cat.id === id) rval = cat;});
    return rval;
  }

  save(){
    const formValues = this.CategoryForm.value;
    let category: ProductCategory = {
      id: this.selectedCategory ? this.selectedCategory.id : 0,
      name: formValues.name,
      parentCategory: this.getCatById(Number(formValues.parentCategory)),
      children: null
    };
    
    var subcription = this.isCreating ? this._categoryService.create(category) : this._categoryService.update(category);
    subcription.subscribe(_ => this.refresh());
  }

  onSelect(category: ProductCategory){
    this.isCreating = false;
    this._categoryService.getByName(category.name)
      .subscribe(newCat => {
        this.selectedCategory = newCat;
        this.CategoryForm.patchValue({
          name: newCat.name,
          parentCategory: newCat.parentCategory ? newCat.parentCategory.id : 0
        });
      });
  }

  onDelete(Category: ProductCategory){
    this._categoryService.delete(Category).subscribe(_ => this.refresh());
  }

  getCategoryChildren(cat: ProductCategory): number[]
  {
    let rval = new Array<number>();
    if(cat.children){
      cat.children.forEach(elem =>{
        rval.push(elem.id);
        if(elem.children){
          rval = rval.concat(this.getCategoryChildren(elem));
        }
      });
    }
    return rval;
  }

  getParentsFor(cat: ProductCategory): ProductCategory[]
  {
    if(!cat){
      return this.Categories;
    }

    let allChild = this.getCategoryChildren(cat);
    allChild.push(cat.id);

    let rval = new Array<ProductCategory>();
    this.Categories.forEach(elem =>{
      if(!allChild.includes(elem.id))
        rval.push(elem);
    });
    return rval;
  }

}
