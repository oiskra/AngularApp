import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssInputComponent } from './css-input.component';

describe('CssInputComponent', () => {
  let component: CssInputComponent;
  let fixture: ComponentFixture<CssInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CssInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CssInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
