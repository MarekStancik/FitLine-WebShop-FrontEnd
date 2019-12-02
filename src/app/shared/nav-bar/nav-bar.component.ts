import { Component, OnInit } from '@angular/core';


interface Section{
  name: string;
  link: string;
}

const SECTIONS: Section[] = [
  {
    name: 'Supplements',
    link: 'products/supplements'
  },
  {
    name: 'Clothing',
    link: 'products/clothes'
  },
  {
    name: 'Exercise Machines',
    link: 'products/machines'
  },
  {
    name: 'Barbells',
    link: 'products/barbells'
  },
  {
    name: 'Tool Racks',
    link: 'products/racks'
  },
  {
    name: 'Discounts',
    link: '/discounts'
  },
  {
    name: 'Brands',
    link: '/brands'
  }
]

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {

  sections: Section[];

  constructor() { }

  ngOnInit() 
  {
    this.sections = Array.from(SECTIONS);
  }
}
