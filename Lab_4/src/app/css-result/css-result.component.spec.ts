import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssResultComponent } from './css-result.component';

describe('CssResultComponent', () => {
  let component: CssResultComponent;
  let fixture: ComponentFixture<CssResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CssResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CssResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
