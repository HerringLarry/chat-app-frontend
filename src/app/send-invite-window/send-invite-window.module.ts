import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendInviteComponent } from './send-invite/send-invite.component';
import { SendInviteWindowComponent } from './send-invite-window.component';
import { SendInviteWindowRoutingModule } from './send-invite-window-routing.module';
import { SharedModule } from '../common/shared.module';
import { MatListModule, MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule, SendInviteWindowRoutingModule, SharedModule, MatListModule, MatIconModule, MatButtonModule,
  ],
  declarations: [
    SendInviteComponent, SendInviteWindowComponent
  ],
  exports: [
    SendInviteWindowComponent, SendInviteComponent,
  ],
})
export class SendInviteWindowModule { }
