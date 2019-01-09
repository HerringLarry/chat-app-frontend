import { DataRequestorService } from 'src/app/common/services/data-requestor.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ThreadService {

    constructor( private _dataRequestor: DataRequestorService) { }

    private _threadId: number;
    private _selected: boolean = false;

    get threadId(): number {
        return this._threadId;
    }

    set threadId( threadId: number ) {
        this._threadId = threadId;
    }

    get selected(): boolean {
        return this._selected;
    }

    set selected( selected: boolean ) {
        this._selected = selected;
    }
}
