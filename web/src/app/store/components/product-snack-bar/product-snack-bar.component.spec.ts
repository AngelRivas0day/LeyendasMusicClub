import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSnackBarComponent } from './product-snack-bar.component';

describe('ProductSnackBarComponent', () => {
  let component: ProductSnackBarComponent;
  let fixture: ComponentFixture<ProductSnackBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSnackBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
