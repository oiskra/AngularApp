import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalitiesCreateComponent } from './functionalities-create.component';

describe('FunctionalitiesCreateComponent', () => {
  let component: FunctionalitiesCreateComponent;
  let fixture: ComponentFixture<FunctionalitiesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunctionalitiesCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunctionalitiesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
