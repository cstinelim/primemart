import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressInfoPage } from './address-info.page';

describe('AddressInfoPage', () => {
  let component: AddressInfoPage;
  let fixture: ComponentFixture<AddressInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
