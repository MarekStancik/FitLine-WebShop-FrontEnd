import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketDropdownComponent } from './basket-dropdown.component';

describe('BasketDropdownComponent', () => {
  let component: BasketDropdownComponent;
  let fixture: ComponentFixture<BasketDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasketDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
