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




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, SharedModule, AppRoutingModule,
    ReactiveFormsModule, FormsModule, HttpClientModule,
  ],
  providers: [
    DataRequestorService,
    SessionService,
    UsernameService,
    LogoutService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
