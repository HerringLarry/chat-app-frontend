import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendInviteComponent } from './send-invite/send-invite.component';
import { SendInviteWindowComponent } from './send-invite-window.component';
import { SendInviteWindowRoutingModule } from './send-invite-window-routing.module';
import { SharedModule } from '../common/shared.module';
import { MatListModule, MatIconModule, MatButtonModule, MatSnackBarModule, MatInputModule, MatFormFieldModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule, SendInviteWindowRoutingModule, MatInputModule, MatFormFieldModule, SharedModule, MatListModule, MatIconModule, MatButtonModule, MatSnackBarModule
  ],
  declarations: [
    SendInviteComponent, SendInviteWindowComponent
  ],
  exports: [
    SendInviteWindowComponent, SendInviteComponent,
  ],
})
export class SendInviteWindowModule { }
