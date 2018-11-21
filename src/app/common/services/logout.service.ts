import { SessionService } from './session.service';
import { UsernameService } from './username.service';
import { Injectable } from '@angular/core';
import { Session } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor() { }

  static logout() {
    UsernameService.username = '';
    SessionService.sessionToken = '';
  }
}
