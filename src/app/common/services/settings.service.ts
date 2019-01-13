import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  static get showUsername(): boolean {
    const _showUsername = window.localStorage.getItem(('showUsername'));
    return _showUsername === 'true';
}

  static set showUsername( showUsername: boolean ) {
    window.localStorage.setItem( 'showUsername', String(showUsername));
  }
}
