import { UsernameService } from './common/services/username.service';
import { DataRequestorService } from './common/services/data-requestor.service';
import { SharedModule } from './common/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SessionService } from './common/services/session.service';
import { LogoutService } from './common/services/logout.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import { MatDialogModule, MatFormFieldModule } from '@angular/material';
import { CurrentThreadService } from './common/services/current-threads-service.service';
import { ThreadService } from './common/services/thread-service.service';
import { SocketService } from './common/services/web-socket.service';
import { MessagesService } from './common/services/messages-service.service';
import { DirectMessagesService } from './common/services/direct-messages-service.service';
import { DirectThreadService } from './common/services/direct-thread-service.service';
import { DirectSocketService } from './common/services/web-socket-direct.service';
import { CurrentDirectThreadsService } from './common/services/current-direct-threads.service';
import { InviteWindowComponent } from './invite-window/invite-window.component';
import { SendInviteWindowComponent } from './send-invite-window/send-invite-window.component';
import { GroupSelectionService } from './common/services/group-selection.service';
import { HeaderInterceptor } from 'src/assets/header-interceptor.service';
import { NotificationsSocketService } from './common/services/web-socket-notifications.service';
import { NotificationsService } from './common/services/notifications-service.service';




@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, SharedModule, AppRoutingModule,
    HttpClientModule, MatDialogModule,
  ],
  providers: [
    DataRequestorService,
    SessionService,
    UsernameService,
    LogoutService,
    ThreadService,
    CurrentThreadService,
    CurrentDirectThreadsService,
    MessagesService,
    SocketService,
    DirectMessagesService,
    DirectThreadService,
    DirectSocketService,
    GroupSelectionService,
    NotificationsSocketService,
    NotificationsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
