import { MainWindowRoutingModule } from './main-window-routing.module';
import { SharedModule } from './../common/shared.module';
import { ChatModule } from './chat/chat.module';
import { NgModule } from '@angular/core';
import { MainWindowComponent } from './main-window.component';
import { MatSidenavModule,MatToolbarModule, MatMenuModule, MatButtonModule, MatIconModule, MatCardModule, MatSnackBarModule, MatProgressSpinnerModule } from '@angular/material';
import { SideBarModule } from './sidebar/side-bar.module';

@NgModule({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    SideBarModule,
    ChatModule,
    SharedModule,
    MainWindowRoutingModule,
    SideBarModule,
    ChatModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    MainWindowComponent,
  ],
  exports: [
    MainWindowComponent,
  ]
})
export class MainWindowModule { }
