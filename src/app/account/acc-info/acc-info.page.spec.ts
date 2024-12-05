import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccInfoPage } from './acc-info.page';

describe('AccInfoPage', () => {
  let component: AccInfoPage;
  let fixture: ComponentFixture<AccInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AccInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
