import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { SidebarComponent } from './sidebar.component';
import { MatMenuModule, MatButtonModule, MatIconModule, MatCardModule, MatSidenavModule, MatToolbarModule, MatChipsModule } from '@angular/material';
import { ThreadOptionComponent } from './thread-list/thread-option/thread-option.component';

@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatChipsModule,
  ],
  declarations: [
    ThreadListComponent,
    SidebarComponent,
    ThreadOptionComponent,
  ],
  exports: [
    SidebarComponent,
  ]
})
export class SideBarModule { }
