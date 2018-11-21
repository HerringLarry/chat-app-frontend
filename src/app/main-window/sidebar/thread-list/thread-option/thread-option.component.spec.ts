import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadOptionComponent } from './thread-option.component';

describe('ThreadOptionComponent', () => {
  let component: ThreadOptionComponent;
  let fixture: ComponentFixture<ThreadOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreadOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
