import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalitiesEditComponent } from './functionalities-edit.component';

describe('FunctionalitiesEditComponent', () => {
  let component: FunctionalitiesEditComponent;
  let fixture: ComponentFixture<FunctionalitiesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionalitiesEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionalitiesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
