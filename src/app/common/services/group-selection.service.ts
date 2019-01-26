import { UsernameService } from 'src/app/common/services/username.service';
import { GroupService } from './group-service.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataRequestorService } from './data-requestor.service';
import { asObservable } from '../as-observable';

@Injectable()
export class GroupSelectionService {

    private _groups: BehaviorSubject<any[]> = new BehaviorSubject([]);

    constructor(private _dataRequestor: DataRequestorService) {
        this.loadInitialData();
    }

    get groups() {
        return asObservable(this._groups);
    }

    loadInitialData() {
        this._dataRequestor.getRequest('groups/getUserGroups/' +  UsernameService.username)
            .subscribe(
                (res: any) => {
                    this._groups.next(res);
                },
                err => console.log('Error retrieving Todos')
            );

    }

    initializeGroups() {
        this._groups.next([]);
    }

}
