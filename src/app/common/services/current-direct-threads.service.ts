import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataRequestorService } from './data-requestor.service';
import { asObservable } from '../as-observable';
import { GroupService } from './group-service.service';
import { UsernameService } from './username.service';
import { DirectThreadService } from './direct-thread-service.service';
import { ThreadService } from './thread-service.service';
import { MessagesService } from './messages-service.service';
import { DirectMessagesService } from './direct-messages-service.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentDirectThreadsService {

  private _directThreads: BehaviorSubject<any[]> = new BehaviorSubject([]);

    constructor(private _dataRequestor: DataRequestorService,
        private _directThreadService: DirectThreadService,
        private _threadService: ThreadService,
        private _messageService: MessagesService,
        private _directMessageService: DirectMessagesService,
      ) {
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

  loadInitialDataAndSelectThread( dMThreadId: number ) {
    this._dataRequestor.getRequest('directmessagethread/' + GroupService.group + '/' + UsernameService.username)
        .subscribe(
            (res: any) => {
                this._directThreads.next(res);
                this.setThreadToSelectedAndJoinThreadRoom( dMThreadId );
            },
            err => console.log('Error retrieving Todos')
        );
  }

  setThreadToSelectedAndJoinThreadRoom( dMThreadId: number ) {
    this.leaveAllCurrentRooms();
    this._threadService.selected = false;
    this._directThreadService.threadId = dMThreadId;
    this._directThreadService.selected = true;
    this._directMessageService.joinRoom( dMThreadId, GroupService.group );


  }

  leaveAllCurrentRooms(): void {
    if ( this._threadService.threadId ) {
      this._messageService.leaveRoom(this._threadService.threadId, GroupService.group);
    }
    this._threadService.threadId = null;
    this._threadService.selected = false;

    if ( this._directThreadService.threadId ) {
      this._directMessageService.leaveRoom(this._directThreadService.threadId, GroupService.group);
    }
    this._directThreadService.threadId = null;
    this._directThreadService.selected = false;
  }
}
