import { Injectable } from '@angular/core';

@Injectable()
export class GroupService {

    static get group(): string | '' {
        return window.localStorage.getItem('group');
    }

    static set group( group: string ) {
        window.localStorage.setItem( 'group', group );
    }
}
