import { Injectable } from '@angular/core';

@Injectable()
export class GroupService {

    static get group(): string {
        if ( window.localStorage.getItem('group') ) {
            return window.localStorage.getItem('group');
        } else {
            return '';
        }
    }

    static set group( group: string ) {
        window.localStorage.setItem( 'group', group );
    }

    static get id(): number {
        return Number(window.localStorage.getItem('groupId'));
    }

    static set id( id: number ) {
        window.localStorage.setItem( 'groupId', String( id ));
    }
}
