import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiedButtonComponent } from './modified-button.component';

describe('ModifiedButtonComponent', () => {
  let component: ModifiedButtonComponent;
  let fixture: ComponentFixture<ModifiedButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifiedButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifiedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
