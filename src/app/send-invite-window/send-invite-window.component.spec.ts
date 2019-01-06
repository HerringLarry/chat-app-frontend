import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendInviteWindowComponent } from './send-invite-window.component';

describe('SendInviteWindowComponent', () => {
  let component: SendInviteWindowComponent;
  let fixture: ComponentFixture<SendInviteWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendInviteWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendInviteWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
