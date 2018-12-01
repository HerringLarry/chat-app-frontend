import { GroupService } from './group-service.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataRequestorService } from './data-requestor.service';
import { asObservable } from '../as-observable';
import { ThreadService } from './thread-service.service';

@Injectable()
export class MessagesService {

    private _messages: BehaviorSubject<any[]> = new BehaviorSubject([]);

    constructor(private _dataRequestor: DataRequestorService, private _threadService: ThreadService) {
        this.loadInitialData();
    }

    get messages() {
        return asObservable(this._messages);
    }

    loadInitialData() {
        this._dataRequestor.getRequest('message/' + GroupService.group + '/' + this._threadService.thread)
            .subscribe(
                (res: any) => {
                    this._messages.next(res);
                },
                err => console.log('Error retrieving Todos')
            );

    }

}
