import { Injectable } from '@angular/core';

@Injectable()
export class UsernameService {

    static get username(): string | '' {
        return window.localStorage.getItem('username');
    }

    static set username( username: string ) {
        window.localStorage.setItem( 'username', username );
    }

    static get id(): number | -1 {
        return Number(window.localStorage.getItem('id'));
    }

    static set id( id: number) {
        window.localStorage.setItem( 'id', String(id) );
    }
}
