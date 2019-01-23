import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  _isLoading = false;

  constructor() { }

  get isLoading(): boolean {
    return this._isLoading;
  }

  set isLoading( _isLoading: boolean ) {
    this._isLoading = _isLoading;
  }
}
