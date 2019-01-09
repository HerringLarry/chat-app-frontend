import { UsernameService } from 'src/app/common/services/username.service';
import { GroupService } from './group-service.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataRequestorService } from './data-requestor.service';
import { asObservable } from '../as-observable';

@Injectable()
export class CurrentThreadService {

    private _threads: BehaviorSubject<any[]> = new BehaviorSubject([]);

    constructor(private _dataRequestor: DataRequestorService) {
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

}
