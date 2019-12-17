import { Component, OnInit } from '@angular/core';

interface Section{
  name: string;
  link: string;
}

const SECTIONS: Section[] = [
  {
    name: 'Products',
    link: '/admin/products'
  },
  {
    name: 'Categories',
    link: '/admin/categories'
  },
  {
    name: 'Orders',
    link: '/admin/orders'
  },
  {
    name: 'Invoices',
    link: '/admin/invoices'
  },
  {
    name: 'Shipments',
    link: '/admin/shipments'
  }

]

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {

  sections: Section[];

  isCollapsed = false;

  constructor() { }

  ngOnInit() 
  {
    this.sections = Array.from(SECTIONS);
  }

}
