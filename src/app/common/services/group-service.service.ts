import { Injectable } from '@angular/core';

@Injectable()
export class GroupService {

    static get group(): string | '' {
        return window.localStorage.getItem('group');
    }

    static set group( group: string ) {
        window.localStorage.setItem( 'group', group );
    }

    static get id(): any {
        return window.localStorage.getItem('groupId');
    }

    static set id( id: any ) {
        window.localStorage.setItem( 'groupId', String( id ));
    }
}
