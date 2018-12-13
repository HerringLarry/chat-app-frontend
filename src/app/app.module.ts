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
import { MessagesService } from './common/services/messages-service.service';
import { SocketService } from './common/services/web-socket.service';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, SharedModule, AppRoutingModule,
    ReactiveFormsModule, FormsModule, HttpClientModule, MatDialogModule, MatFormFieldModule,
  ],
  providers: [
    DataRequestorService,
    SessionService,
    UsernameService,
    LogoutService,
    ThreadService,
    CurrentThreadService,
    MessagesService,
    SocketService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
