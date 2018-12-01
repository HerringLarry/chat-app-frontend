import { CurrentThreadService } from './current-threads-service.service';
import { SessionService } from './session.service';
import { UsernameService } from './username.service';
import { Injectable } from '@angular/core';
import { Session } from 'protractor';
import { GroupService } from './group-service.service';
import { MessagesService } from './messages-service.service';
import { ThreadService } from './thread-service.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor( private _currentThreadService: CurrentThreadService ) { }

  static logout() {
    UsernameService.username = '';
    SessionService.sessionToken = '';
    MessagesService.messages = [];
    GroupService.group = '';
  }
}
