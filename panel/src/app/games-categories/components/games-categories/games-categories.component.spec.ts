import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesCategoriesComponent } from './games-categories.component';

describe('GamesCategoriesComponent', () => {
  let component: GamesCategoriesComponent;
  let fixture: ComponentFixture<GamesCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
