import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupSelectionWindowComponent } from './group-selection-window.component';
import { GroupSelectionWindowRoutingModule } from './group-selection-window-routing.module';
import { SharedModule } from '../common/shared.module';
import { MatListModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule, GroupSelectionWindowRoutingModule, SharedModule, MatListModule, MatIconModule,
  ],
  declarations: [
    GroupSelectionWindowComponent,
  ],
  exports: [
    GroupSelectionWindowComponent,
  ]
})
export class GroupSelectionWindowModule { }
