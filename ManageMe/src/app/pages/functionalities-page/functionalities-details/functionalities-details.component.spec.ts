import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalitiesDetailsComponent } from './functionalities-details.component';

describe('FunctionalitiesDetailsComponent', () => {
  let component: FunctionalitiesDetailsComponent;
  let fixture: ComponentFixture<FunctionalitiesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionalitiesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionalitiesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
