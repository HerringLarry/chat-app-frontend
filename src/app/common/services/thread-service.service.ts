import { DataRequestorService } from 'src/app/common/services/data-requestor.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ThreadService {

    constructor( private _dataRequestor: DataRequestorService) { }

    private _thread: string;

    get thread(): string {
        return this._thread;
    }

    set thread( thread: string ) {
        this._thread = thread;
    }
}
