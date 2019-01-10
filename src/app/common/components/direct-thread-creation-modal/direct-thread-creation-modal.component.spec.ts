import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectThreadCreationModalComponent } from './direct-thread-creation-modal.component';

describe('DirectThreadCreationModalComponent', () => {
  let component: DirectThreadCreationModalComponent;
  let fixture: ComponentFixture<DirectThreadCreationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectThreadCreationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectThreadCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
