import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBillingAddressComponent } from './user-billing-address.component';

describe('UserBillingAddressComponent', () => {
  let component: UserBillingAddressComponent;
  let fixture: ComponentFixture<UserBillingAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBillingAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBillingAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
