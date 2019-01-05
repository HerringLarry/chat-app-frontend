import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InviteComponent } from './invite/invite.component';
import { InviteWindowRoutingModule } from './invite-window-routing.module';
import { SharedModule } from '../common/shared.module';
import { MatListModule, MatIconModule, MatButtonModule } from '@angular/material';
import { InviteWindowComponent } from './invite-window.component';

@NgModule({
  imports: [
    CommonModule, InviteWindowRoutingModule, SharedModule, MatListModule, MatIconModule, MatButtonModule,
  ],
  declarations: [InviteComponent, InviteWindowComponent]
})
export class InviteWindowModule { }
