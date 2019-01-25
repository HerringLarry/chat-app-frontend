import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  static get showUsername(): boolean {
    const _showUsername = window.localStorage.getItem('showUsername');
    return _showUsername === 'true';
}

  static set showUsername( showUsername: boolean ) {
    window.localStorage.setItem( 'showUsername', String(showUsername));
  }

  static get showNotifications(): boolean {
    const _showNotifications = window.localStorage.getItem('showNotifications');
    return _showNotifications === 'true';
  }

  static set showNotifications( showNotifications: boolean ) {
    window.localStorage.setItem( 'showNotifications', String(showNotifications));
  }

  static get showTime(): boolean {
    const _showTime = window.localStorage.getItem('showTime');
    return _showTime === 'true';
  }

  static set showTime( showTime: boolean ) {
    window.localStorage.setItem( 'showTime', String(showTime));
  }
}
