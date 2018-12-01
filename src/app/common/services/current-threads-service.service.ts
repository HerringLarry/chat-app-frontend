import { GroupService } from './group-service.service';
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { DataRequestorService } from "./data-requestor.service";
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
        this._dataRequestor.getRequest('thread/' + GroupService.group)
            .subscribe(
                (res: any) => {
                    this._threads.next(res);
                },
                err => console.log('Error retrieving Todos')
            );

    }

}
