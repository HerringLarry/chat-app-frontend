import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataRequestorService } from './data-requestor.service';
import { asObservable } from '../as-observable';
import { GroupService } from './group-service.service';
import { UsernameService } from './username.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentDirectThreadsService {

  private _directThreads: BehaviorSubject<any[]> = new BehaviorSubject([]);

    constructor(private _dataRequestor: DataRequestorService) {
        this.loadInitialData();
    }

    get directThreads() {
        return asObservable(this._directThreads);
    }

    loadInitialData() {
      this._dataRequestor.getRequest('directmessagethread/' + GroupService.group + '/' + UsernameService.username)
      .subscribe(
        (res: any) => {
            this._directThreads.next(res);
        },
        err => console.log('Error retrieving Todos')
    );
  }
}
