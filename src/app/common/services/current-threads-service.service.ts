import { DirectMessageThreadDto } from './../components/direct-thread-creation-modal/dto/direct-message-thread.dto';
import { UsernameService } from 'src/app/common/services/username.service';
import { GroupService } from './group-service.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataRequestorService } from './data-requestor.service';
import { asObservable } from '../as-observable';
import { DirectThreadService } from './direct-thread-service.service';
import { ThreadService } from './thread-service.service';
import { MessagesService } from './messages-service.service';
import { DirectMessagesService } from './direct-messages-service.service';

@Injectable()
export class CurrentThreadService {

    private _threads: BehaviorSubject<any[]> = new BehaviorSubject([]);

    constructor(private _dataRequestor: DataRequestorService,
        private _directThreadService: DirectThreadService,
        private _threadService: ThreadService,
        private _messageService: MessagesService,
        private _directMessageService: DirectMessagesService,
        ) {
        this.loadInitialData();
    }

    get threads() {
        return asObservable(this._threads);
    }

    loadInitialData() {
        console.log('loading');
        this._dataRequestor.getRequest('thread/getThreads/' + GroupService.group + '/' + UsernameService.username)
            .subscribe(
                (res: any) => {
                    this._threads.next(res);
                },
                err => console.log('Error retrieving Todos')
            );

    }

    loadInitialDataAndSelectThread( threadId: number ) {
        this._dataRequestor.getRequest('thread/getThreads/' + GroupService.group + '/' + UsernameService.username)
            .subscribe(
                (res: any) => {
                    this._threads.next(res);
                    this.setThreadToSelectedAndJoinThreadRoom( threadId );
                },
                err => console.log('Error retrieving Todos')
            );
    }

    setThreadToSelectedAndJoinThreadRoom( threadId: number ) {
        this.leaveAllCurrentRooms();
        this._directThreadService.selected = false;
        this._threadService.threadId = threadId;
        this._threadService.selected = true;
        this._messageService.joinRoom( threadId, GroupService.group );
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
